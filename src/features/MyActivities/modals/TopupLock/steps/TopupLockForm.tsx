'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { DEV_MODE } from '@/shared/constants/config.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_LP_TOKEN,
  isLockableToken,
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

  const lock = topupLockDialogState.lock;

  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const token = watch('token');
  const amount = watch('amount');
  const maturityId = watch('maturityId');

  const typedToken = isLockableToken(token) ? token : DEFAULT_LP_TOKEN;
  const tokenInfo = tokens[typedToken];

  const currentLockAmount = lock?.lockedAmount ?? 0;
  const totalAccruingRewards = lock?.rewards.kvcm ?? 0;
  const tokenSymbol = tokenInfo.symbol;
  const maturityDate = lock?.lockedUntil ?? null;
  const baseApy = lock?.riskyYieldApyPercent ?? 0;

  const isValidAmount = !!(amount && amount > 0);
  const availableBalance = Number(walletData?.balances?.[typedToken] ?? 0);
  const exceedsBalance = isValidAmount && Number(amount) > availableBalance;
  const balanceErrorMessage = exceedsBalance
    ? 'You cannot add more than your available balance.'
    : null;

  const amountWei = isValidAmount
    ? parseUnits(String(amount.toFixed(tokenInfo.decimals)), tokenInfo.decimals)
    : 0n;

  const isMaturityWithin3Days =
    isValidAmount && isMaturityWithinDays(maturityDate, 3);

  const { lockToken } = useLockToken({
    token: typedToken,
    amount: amountWei,
    maturityId: maturityId ?? lock?.maturityId ?? 1,
  });

  const isKvcm = token === 'kvcm';
  const lockTerm = isKvcm ? 'lock' : 'stake';

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');
    const result = await handleTransaction(lockToken, {
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
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <DialogHeader
        showCloseButton
        title={`Top up ${lockTerm}`}
        onClose={reset}
      />
      <p className="text-size-14 text-gray-500">
        <span className="capitalize">{lockTerm}</span> duration will stay
        unchanged.
      </p>
      <Form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <StatsCard
          baseApy={baseApy}
          token={tokenInfo}
          maturityDate={maturityDate}
          currentLockAmount={currentLockAmount}
          totalAccruingRewards={totalAccruingRewards}
        />
        <div className="flex flex-col gap-1">
          <Input
            label="Amount to add"
            type="number"
            iconSize={isKvcm ? 'sm' : 'md'}
            iconSrc={tokens[typedToken].iconSrc}
            {...form.register('amount', { valueAsNumber: true })}
            step={10 ** -tokenInfo.decimals}
            error={
              formState.errors.amount ||
              (balanceErrorMessage
                ? { type: 'manual', message: balanceErrorMessage }
                : undefined)
            }
            onFocus={(e) => {
              if (
                e.currentTarget.value !== '' &&
                Number(e.currentTarget.value) === 0
              ) {
                e.currentTarget.select();
              }
            }}
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
          {DEV_MODE && (
            <K2Incentives
              k2Incentives={totalAccruingRewards}
              token={typedToken}
            />
          )}
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
