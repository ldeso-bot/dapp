'use client';

import { DurationSelector } from '@/features/MyActivities/shared/DurationSelector';
import { DurationSlider } from '@/features/MyActivities/shared/DurationSlider';
import { DurationStepper } from '@/features/MyActivities/shared/DurationStepper';
import { IncentivesBreakdownCard } from '@/features/MyActivities/shared/YieldBreakdownCard';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_ALLOCATION_TOKEN,
  isLockableToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { delay, isMaturityWithinDays } from '@/shared/utils/date.utils';
import {
  formatAmountWithCommas,
  parseAmount,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import {
  lockTokenDialogAtom,
  LockTokenFields,
  useLockToken,
} from '../lockToken.utils';

export const LockTokenForm: FormFlowStep<LockTokenFields> = ({ data }) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();

  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const token = watch('token');
  const amount = watch('amount');
  const maturityId = watch('maturityId');

  const typedToken = isLockableToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;
  const tokenInfo = tokens[typedToken];
  const tokenBalance = walletData?.balances?.[typedToken] ?? 0;

  const isValidAmount = !!(amount && amount > 0);
  const amountWei = isValidAmount
    ? parseAmount(amount, tokenInfo.decimals)
    : 0n;

  const maturity = protocolData?.maturities[maturityId] ?? null;
  const maturityDate = maturity?.maturationTimestamp;
  const isMaturityWithin30Days =
    isValidAmount && isMaturityWithinDays(maturityDate, 30);

  const { lockToken } = useLockToken({
    amount: amountWei,
    token: typedToken,
    maturityId: maturityId ?? 1,
  });

  const isKvcm = token === 'kvcm';
  const lockTerm = isKvcm ? 'lock' : 'stake';
  const lockTermed = isKvcm ? 'locked' : 'staked';
  const buttonText = isKvcm
    ? isSubmitting
      ? 'Locking...'
      : `Lock ${tokenInfo.symbol}`
    : isSubmitting
      ? 'Staking...'
      : `Stake ${tokenInfo.symbol}`;

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');

    const result = await handleTransaction(lockToken, {
      successTitle: isKvcm ? 'Lock Successful' : 'Stake Successful',
      successDescription: (
        <>
          <div>
            You&apos;ve successfully {lockTermed} {amount} {tokenInfo.symbol}!
            You can manage your positions in the &quot;My Activities&quot;
            dashboard.
          </div>

          <div style={{ marginTop: 8 }}>
            <strong>
              Your incentives are calculated daily, but they may not show up in
              the UI for up to 48 hours.
            </strong>
          </div>
        </>
      ),
      errorDescription: `Something went wrong and your ${lockTerm} was not successful.`,
      successLinks: [{ label: 'My Activities', href: ROUTES.MY_ACTIVITIES }],
      successEvent: {
        name: isKvcm ? 'lock_kvcm' : 'stake_lp',
        payload: { amount, token: typedToken },
      },
      onSuccess: async () => {
        await delay(300);
        setLockTokenDialogState({ open: false, token: null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });

    if (result.error) {
      setError('root', { type: 'manual', message: result.error });
    }
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <DialogHeader
        showCloseButton
        title={`${lockTerm} ${tokenInfo.symbol} Tokens`}
        onClose={() => setLockTokenDialogState({ open: false, token: null })}
      />
      <Form
        className="pt-0 relative"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputGroup className="pt-1">
          <div className="flex flex-col gap-1 pt-3">
            <div className="flex flex-col gap-1">
              <label className="text-size-14 font-medium">
                Amount to {lockTerm}
              </label>
            </div>
            <div className="flex items-start gap-2">
              <Input
                type="number"
                iconSize={isKvcm ? 'sm' : 'md'}
                iconSrc={tokens[typedToken].iconSrc}
                {...form.register('amount', { valueAsNumber: true })}
                error={formState.errors.amount}
                onFocus={(e) => {
                  if (
                    e.currentTarget.value !== '' &&
                    Number(e.currentTarget.value) === 0
                  ) {
                    e.currentTarget.select();
                  }
                }}
              />

              <Button
                type="button"
                colors="secondary"
                className="rounded-xl min-h-[4rem]"
                onClick={() => form.setValue('amount', Number(tokenBalance))}
              >
                Max
              </Button>
            </div>
            <span className="text-size-12 text-gray-500">
              Balance: {formatAmountWithCommas(Number(tokenBalance), 'auto')}{' '}
              {tokenInfo.symbol}
            </span>
          </div>
          {maturityId !== undefined && (
            <>
              <DurationSelector name="maturityId" control={form.control} />
              <div className="space-y-2 flex flex-col gap-2">
                <DurationStepper name="maturityId" control={form.control} />
                <DurationSlider name="maturityId" control={form.control} />
              </div>
              <div className="text-size-12 text-void-40">
                <p>
                  Select a custom duration. Each step represents an increase or
                  decrease of 90 days.
                </p>
                <div className="w-full h-[1px] bg-void-20 my-2" />
                <p>
                  Incentives (kVCM and/or K2) accrue until the end of the chosen
                  duration and then become claimable.
                </p>
                <br></br>
                <p className="text-xl text-black font-bold">
                  Incentives are calculated daily, but they may not show up in
                  the UI for up to 48 hours.
                </p>
              </div>
              {maturity && (
                <IncentivesBreakdownCard
                  amount={watch('amount')}
                  maturity={maturity}
                />
              )}
            </>
          )}
          {formState.errors.root && (
            <RootError
              sticky={false}
              errorMessage={formState.errors.root.message ?? ''}
            />
          )}
          {isMaturityWithin30Days ? (
            <RootError
              variant="warning"
              errorMessage="Duration is less than 30 days. Pay attention to short durations; rewards may not accrue for very long."
            />
          ) : null}
        </InputGroup>
        <ButtonGroup className="flex-row">
          <Button
            colors="primary"
            context="flow"
            className="rounded-xl"
            onClick={() =>
              setLockTokenDialogState({ open: false, token: null })
            }
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl capitalize"
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting || !isValidAmount}
          >
            {buttonText}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
