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
import {
  formatAmountWithCommas,
  parseAmount,
} from '@/shared/utils/string.utils';
import { useAtom } from 'jotai';
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
  const baseApy =
    lock?.token === 'kvcm'
      ? (lock?.syntheticYieldApyPercent ?? 0)
      : (lock?.riskyYieldApyPercent ?? 0);

  const isValidAmount = !!(amount && amount > 0);
  const availableBalance = Number(walletData?.balances?.[typedToken] ?? 0);

  const exceedsBalance = isValidAmount && Number(amount) > availableBalance;
  const balanceErrorMessage = exceedsBalance
    ? 'You cannot add more than your available balance.'
    : null;

  const amountWei = isValidAmount
    ? parseAmount(amount, tokenInfo.decimals)
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
      successDescription: (
        <>
          <div>
            You&apos;ve successfully topped up {amount} {tokenInfo.symbol}! You
            can manage your positions in the &quot;My Activities&quot;
            dashboard.
          </div>
          <div style={{ height: 8 }} />
          <div>
            <strong>
              Incentives are calculated daily, but they may not show up in the
              UI for up to 48 hours.
            </strong>
          </div>
        </>
      ),
      errorDescription: 'Something went wrong with your top up.',
      successLinks: [{ label: 'My Activities', href: ROUTES.MY_ACTIVITIES }],
      successEvent: {
        name: 'topup_lock',
        payload: { amount, token: typedToken },
      },
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
      <p className="text-size-14 text-text-3">
        <span className="capitalize">{lockTerm}</span> duration will stay
        unchanged.
      </p>
      <Form className="gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                className="rounded-xl text-text-static-light min-h-[4rem] border-border-strong"
                onClick={() =>
                  form.setValue('amount', Number(availableBalance))
                }
              >
                MAX
              </Button>
            }
          />

          <span className="text-size-12 text-text-2">
            Balance: {formatAmountWithCommas(availableBalance, 'auto')}{' '}
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
          <RootError errorMessage="Duration is less than 3 days. Pay attention to short durations; rewards may be minimal. Consider choosing a later duration." />
        )}
        <ButtonGroup className="flex-row">
          <Button
            colors="primary"
            className="border-border-strong"
            context="flow"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button
            colors="secondary"
            context="flow"
            className="border-border-strong text-text-static-light"
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
