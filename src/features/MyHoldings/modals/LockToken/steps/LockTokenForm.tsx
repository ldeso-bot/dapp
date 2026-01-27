'use client';

import { DurationSelector } from '@/features/MyHoldings/shared/DurationSelector';
import { DurationSlider } from '@/features/MyHoldings/shared/DurationSlider';
import { DurationStepper } from '@/features/MyHoldings/shared/DurationStepper';
import { IncentivesBreakdownCard } from '@/features/MyHoldings/shared/YieldBreakdownCard';
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
  AllocatableToken,
  DEFAULT_ALLOCATION_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { delay, isMaturityWithinDays } from '@/shared/utils/date.utils';
import { findClosestMaturityByDays } from '@/shared/utils/protocol.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
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
  const duration = watch('duration');
  const maturityId = watch('maturityId');

  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;
  const tokenInfo = tokens[typedToken];
  const tokenBalance = walletData?.balances?.[typedToken] ?? 0;

  const isValidAmount = !!(amount && amount > 0);
  const amountWei = isValidAmount
    ? parseUnits(String(amount), tokenInfo.decimals)
    : 0n;

  const maturity = findClosestMaturityByDays(
    Number(duration),
    protocolData?.maturities ?? []
  );

  const maturityDate = maturity?.maturationTimestamp;
  const fullMaturity = protocolData?.maturities?.find(
    (m) => m.maturityId === maturity?.maturityId
  );
  const isMaturityWithin3Days =
    isValidAmount && isMaturityWithinDays(maturityDate, 3);
  const isMaturityWithin30Days =
    isValidAmount && isMaturityWithinDays(maturityDate, 30);

  useEffect(() => {
    if (maturity) {
      form.setValue('maturityId', maturity.maturityId);
      form.setValue('maturityDate', maturity.maturationTimestamp);
    }
  }, [duration, maturity, form]);

  const { lock } = useLockToken({
    amount: amountWei,
    token: typedToken as AllocatableToken,
    maturityId: maturityId ?? 1,
  });

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');

    const result = await handleTransaction(lock, {
      successTitle: 'Lock Successful',
      successDescription: `You've successfully locked ${amount} ${tokenInfo.symbol}! You can manage your positions in the "My Holdings" dashboard.`,
      errorDescription:
        'Something went wrong and your lock was not successful.',
      successLinks: [{ label: 'My Holdings', href: ROUTES.MY_HOLDINGS }],
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
        title={`Lock ${tokenInfo.symbol} Tokens`}
        onClose={() => setLockTokenDialogState({ open: false, token: null })}
      />
      <Form className="pt-0 relative" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="pt-1">
          <div className="flex flex-col gap-1 pt-3">
            <div className="flex flex-col gap-1">
              <label className="text-size-14 font-medium">Amount to lock</label>
            </div>
            <div className="flex items-start gap-2">
              <Input
                type="number"
                iconSize="sm"
                iconSrc={tokens[typedToken].iconSrc}
                {...form.register('amount')}
                error={formState.errors.amount}
              />
              <Button
                colors="secondary"
                className="rounded-xl min-h-[4rem]"
                onClick={() => form.setValue('amount', Number(tokenBalance))}
              >
                Max
              </Button>
            </div>
            <span className="text-size-12 text-gray-500">
              Balance: {formatAmountWithCommas(Number(tokenBalance))}{' '}
              {tokenInfo.symbol}
            </span>
          </div>
          {duration !== undefined && (
            <>
              <DurationSelector name="duration" control={form.control} />
              <div className="space-y-2 flex flex-col gap-2">
                <DurationStepper name="duration" control={form.control} />
                <DurationSlider name="duration" control={form.control} />
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
              </div>
              {fullMaturity && duration !== undefined && (
                <IncentivesBreakdownCard
                  duration={duration}
                  amount={watch('amount')}
                  fullMaturity={fullMaturity}
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
          {isMaturityWithin3Days ? (
            <RootError errorMessage="Locking kVCM is an irreversible protocol action for coordination and parameter signalling. Incentives are variable, non-guaranteed, and may be zero. Locking should not be used for short-term positioning or yield optimisation." />
          ) : isMaturityWithin30Days ? (
            <RootError
              variant="warning"
              errorMessage="Time to maturity reset is in less than 30 days. Pay attention to short maturity dates; rewards may not accrue for very long."
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
            className="rounded-xl"
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Locking...' : `Lock ${tokenInfo.symbol}`}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
