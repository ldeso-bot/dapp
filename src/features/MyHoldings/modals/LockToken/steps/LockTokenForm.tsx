'use client';

import { DurationSelector } from '@/features/MyHoldings/modals/LockToken/components/DurationSelector';
import { DurationStepper } from '@/features/MyHoldings/modals/LockToken/components/DurationStepper';
import { YieldBreakdownCard } from '@/features/MyHoldings/shared/YieldBreakdownCard';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
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
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { DurationSlider } from '../components/DurationSlider';
import {
  findClosestMaturityByDays,
  lockTokenDialogAtom,
  LockTokenFields,
  useLockToken,
} from '../lockToken.utils';

export const LockTokenForm: FormFlowStep<LockTokenFields> = ({ data }) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();

  const { handleSubmit, formState, watch } = form;
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const token = watch('token');
  const amount = watch('amount');
  const duration = watch('duration');
  const maturityId = watch('maturityId');

  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;
  const tokenInfo = tokens[typedToken];
  const tokenBalance = walletData?.balances?.[typedToken] ?? 0;

  const amountWei =
    amount && amount > 0 ? parseUnits(String(amount), tokenInfo.decimals) : 0n;

  const { lock } = useLockToken({
    token: typedToken as AllocatableToken,
    amount: amountWei,
    maturityId: maturityId ?? 1,
  });

  const selectedMaturity = findClosestMaturityByDays(
    Number(duration),
    protocolData?.lockedkVcmYieldRates ?? []
  );

  useEffect(() => {
    if (selectedMaturity) {
      form.setValue('maturityId', selectedMaturity.maturityId);
      form.setValue('maturityDate', selectedMaturity.maturationTimestamp);
    }
  }, [duration, selectedMaturity, form]);

  const onSubmit = async () => {
    if (!isConnected) return;
    await handleTransaction(lock, {
      successTitle: 'Lock Successful',
      successDescription: `You've successfully locked ${amount} ${tokenInfo.symbol}! You can manage your positions in the "My Holdings" dashboard.`,
      errorDescription:
        'Something went wrong and your lock was not successful.',
      successLinks: [{ label: 'My Holdings', href: ROUTES.MY_HOLDINGS }],
      onSuccess: () => {
        setTimeout(() => {
          // Small delay to let UI update before closing modal
          setLockTokenDialogState({ open: false, token: null });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      },
    });
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <h2 className="text-size-20 font-semibold text-gray-900">
        Lock {tokenInfo.symbol} Tokens
      </h2>
      <Form className="pt-0" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="pt-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2">
              <Input
                type="number"
                className="pl-10"
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
          <DurationSelector control={form.control} />
          <div className="space-y-2 flex flex-col gap-2">
            <DurationStepper control={form.control} />
            <DurationSlider control={form.control} />
          </div>
          <div className="text-size-12 text-void-40">
            <p>
              Duration between maturities is 90 days. Choose from supported
              dates.
            </p>
            <div className="w-full h-[1px] bg-void-20 my-2" />
            <p>
              Rewards (kVCM base, optional K2 incentives) accrue until maturity
              and are claimable at maturity.
            </p>
          </div>
          {selectedMaturity && (
            <YieldBreakdownCard
              duration={duration}
              amount={watch('amount')}
              selectedMaturity={selectedMaturity}
            />
          )}
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
