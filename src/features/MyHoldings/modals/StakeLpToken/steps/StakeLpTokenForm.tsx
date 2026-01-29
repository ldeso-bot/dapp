'use client';

import { DurationSelector } from '@/features/MyHoldings/shared/DurationSelector';
import { DurationSlider } from '@/features/MyHoldings/shared/DurationSlider';
import { DurationStepper } from '@/features/MyHoldings/shared/DurationStepper';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import {
  DEFAULT_LP_TOKEN,
  isLpToken,
  lpTokens,
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
import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import {
  stakeLpTokenDialogAtom,
  StakeLpTokenFields,
  useStakeLpToken,
} from '../stakeLpToken.utils';

export const StakeLpTokenForm: FormFlowStep<StakeLpTokenFields> = ({
  data,
}) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();

  const setStakeLpTokenDialogState = useSetAtom(stakeLpTokenDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const token = watch('token');
  const amount = watch('amount');
  const duration = watch('duration');
  const maturityId = watch('maturityId');

  const typedToken = isLpToken(token) ? token : DEFAULT_LP_TOKEN;
  const tokenInfo = tokens[typedToken];
  const tokenBalance = walletData?.balances?.[typedToken] ?? 0;

  const lpTokenDisplayName = lpTokens[typedToken]?.symbol || typedToken;

  const maturity = findClosestMaturityByDays(
    Number(duration),
    protocolData?.maturities ?? []
  );

  const maturityDate = maturity?.maturationTimestamp;
  const isValidAmount = !!(amount && amount > 0 && maturityId);
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

  const amountWei = isValidAmount
    ? parseUnits(String(amount), tokenInfo.decimals)
    : 0n;

  const lpTokenAddress = protocolData?.metrics?.[typedToken]?.address as
    | Address
    | undefined;

  const { stake } = useStakeLpToken({
    token: typedToken,
    amount: amountWei,
    maturityId: maturityId ?? 1,
    lpTokenAddress,
  });

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');

    if (!maturityId) {
      setError('root', {
        type: 'manual',
        message: 'Please select a maturity date',
      });
      return;
    }

    const result = await handleTransaction(stake, {
      successTitle: 'Stake LP Successful',
      successDescription: `You've successfully staked ${formatAmountWithCommas(Number(amount) || 0)} ${lpTokenDisplayName} LP! You can manage your positions in the "My Holdings" dashboard.`,
      errorDescription:
        'Something went wrong and your stake was not successful.',
      onSuccess: async () => {
        await delay(300);
        setStakeLpTokenDialogState({ open: false, token: null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });

    if (result.error) {
      setError('root', { type: 'manual', message: result.error });
    }
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <h2 className="text-size-20 font-semibold text-gray-900">
        Stake {lpTokenDisplayName} LP
      </h2>
      <Form className="pt-0 relative" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="pt-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2">
              <Input
                type="number"
                iconSize="md"
                iconSrc={tokens[typedToken].iconSrc}
                {...form.register('amount')}
                error={formState.errors.amount}
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
              Balance: {formatAmountWithCommas(Number(tokenBalance))}{' '}
              {tokenInfo.symbol}
            </span>
          </div>
          <DurationSelector name="duration" control={form.control} />
          <div className="space-y-2 flex flex-col gap-2">
            <DurationStepper name="duration" control={form.control} />
            <DurationSlider name="duration" control={form.control} />
          </div>
          <div className="text-size-12 text-void-40">
            <div className="w-full h-[1px] bg-void-20 my-2" />
            <p>
              Incentives (kVCM and/or K2) accrue until the end of the chosen
              duration and then become claimable.
            </p>
          </div>
          {formState.errors.root && (
            <RootError
              sticky={false}
              errorMessage={formState.errors.root.message ?? ''}
            />
          )}
          {isMaturityWithin3Days ? (
            <RootError errorMessage="Time to maturity reset is in less than 3 days. Pay attention to short maturity dates; rewards may be minimal. Consider choosing a later maturity." />
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
              setStakeLpTokenDialogState({ open: false, token: null })
            }
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl"
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting || !isValidAmount}
          >
            {isSubmitting ? 'Staking...' : 'Stake'}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
