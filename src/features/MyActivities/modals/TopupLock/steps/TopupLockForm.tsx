'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  AllocatableToken,
  DEFAULT_LP_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { delay, isMaturityWithinDays } from '@/shared/utils/date.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useAtom } from 'jotai';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useLockToken } from '../../LockToken/lockToken.utils';
import { K2Incentives } from '../components/K2Incentives';
import { StatsCard } from '../components/StatsCard';
import { TotalMaturity } from '../components/TotalMaturity';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
  TopupLockFields,
} from '../topupLock.utils';

export const TopupLockForm: FormFlowStep<TopupLockFields> = ({ data }) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { data: walletData } = useWalletData();

  const [topupLockDialogState, setTopupLockDialogState] =
    useAtom(topupLockDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const token = watch('token');
  const amount = watch('amount');
  const maturityId = watch('maturityId');

  const typedToken = isToken(token) ? token : DEFAULT_LP_TOKEN;
  const tokenInfo = tokens[typedToken];

  const currentLockAmount = topupLockDialogState.currentLockAmount ?? 0;
  const totalAccruingRewards = topupLockDialogState.totalAccruingRewards ?? 0;
  const tokenSymbol = topupLockDialogState.tokenSymbol ?? '';
  const maturityDate = topupLockDialogState.maturityDate ?? null;
  const baseApy = topupLockDialogState.baseApy ?? 0;

  const isValidAmount = !!(amount && amount > 0);
  const availableBalance = Number(walletData?.balances?.[typedToken] ?? 0);
  const exceedsBalance = isValidAmount && Number(amount) > availableBalance;
  const balanceErrorMessage = exceedsBalance
    ? 'You cannot add more than your available balance.'
    : null;

  const amountWei = isValidAmount
    ? parseUnits(String(amount), tokenInfo.decimals)
    : 0n;

  const isMaturityWithin3Days =
    isValidAmount && isMaturityWithinDays(maturityDate, 3);

  const { lock } = useLockToken({
    token: typedToken as AllocatableToken,
    amount: amountWei,
    maturityId: maturityId ?? topupLockDialogState.maturityId ?? 1,
  });

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');
    const result = await handleTransaction(lock, {
      successTitle: 'Top up Successful',
      successDescription: `You've successfully topped up ${amount} ${tokenInfo.symbol}! You can manage your positions in the "My Activities" dashboard.`,
      errorDescription: 'Something went wrong with your top up.',
      successLinks: [{ label: 'My Activities', href: ROUTES.MY_ACTIVITIES }],
      onSuccess: async () => {
        await delay(300);
        setTopupLockDialogState(resetTopupLockDialog());
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
    if (result.error) {
      setError('root', { type: 'manual', message: result.error });
    }
  };

  const reset = () => setTopupLockDialogState(resetTopupLockDialog());

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem]">
      <DialogHeader showCloseButton title="Top up lock" onClose={reset} />
      <p className="text-size-14 text-gray-500">
        Lock duration will stay unchanged.
      </p>
      <Form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <StatsCard
          baseApy={baseApy}
          tokenSymbol={tokenSymbol}
          maturityDate={maturityDate}
          currentLockAmount={currentLockAmount}
          totalAccruingRewards={totalAccruingRewards}
        />
        <div className="flex flex-col gap-1">
          <Input
            label="Amount to add"
            type="number"
            iconSize="sm"
            iconSrc={tokens[typedToken].iconSrc}
            {...form.register('amount')}
            step={10 ** -tokenInfo.decimals}
            error={
              formState.errors.amount ||
              (balanceErrorMessage
                ? { type: 'manual', message: balanceErrorMessage }
                : undefined)
            }
            addOnButton={
              <Button
                type="button"
                colors="secondary"
                className="rounded-xl min-h-[4rem]"
                onClick={() =>
                  form.setValue('amount', Number(availableBalance))
                }
              >
                Max
              </Button>
            }
          />
          <span className="text-size-12 text-gray-600">
            Balance: {formatAmountWithCommas(availableBalance)}{' '}
            {tokenInfo.symbol}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <TotalMaturity
            tokenSymbol={tokenSymbol}
            currentLockAmount={currentLockAmount}
            topUpAmount={isValidAmount ? Number(amount) : 0}
          />
          <K2Incentives k2Incentives={totalAccruingRewards} />
        </div>
        {formState.errors.root && (
          <RootError
            sticky={false}
            errorMessage={formState.errors.root.message ?? ''}
          />
        )}
        {isValidAmount && isMaturityWithin3Days && (
          <RootError errorMessage="Time to maturity reset is in less than 3 days. Pay attention to short maturity dates; rewards may be minimal. Consider choosing a later maturity." />
        )}
        <ButtonGroup className="flex-row">
          <Button colors="primary" context="flow" onClick={() => reset()}>
            Cancel
          </Button>
          <Button
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting || !!balanceErrorMessage}
          >
            {isSubmitting ? 'Topping up...' : 'Confirm top up'}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
