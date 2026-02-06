'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { delay } from '@/shared/utils/date.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import {
  depositK2TokenDialogAtom,
  DepositK2TokenFields,
  useDepositK2Token,
} from '../depositK2Token.utils';

export const DepositK2TokenForm: FormFlowStep<DepositK2TokenFields> = ({
  data,
}) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { data: walletData } = useWalletData();

  const setDepositK2TokenDialogState = useSetAtom(depositK2TokenDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const amount = watch('amount');
  const tokenInfo = tokens.k2;
  const tokenBalance = walletData?.balances?.k2 ?? 0;

  const isValidAmount = !!(amount && amount > 0);
  const amountWei = isValidAmount
    ? parseUnits(String(amount), tokenInfo.decimals)
    : 0n;

  useEffect(() => {
    if (amount && amount > 0 && tokenBalance > 0) {
      if (amount > tokenBalance) {
        setError('amount', {
          type: 'manual',
          message: `Amount exceeds available balance.`,
        });
      } else {
        clearErrors('amount');
      }
    }
  }, [amount, tokenBalance, setError, clearErrors, tokenInfo.symbol]);

  const { deposit } = useDepositK2Token({
    amount: amountWei,
  });

  const onSubmit = async () => {
    if (!isConnected) return;
    clearErrors('root');

    if (amount && amount > tokenBalance) {
      setError('root', {
        type: 'manual',
        message: `Cannot deposit more than available balance.`,
      });
      return;
    }

    const result = await handleTransaction(deposit, {
      successTitle: 'Deposit K2',
      successDescription: `Deposited ${amount} K2. Each deposit becomes unlock-eligible after one full incentives period.`,
      errorDescription:
        'Something went wrong and your deposit was not successful.',
      onSuccess: async () => {
        await delay(300);
        setDepositK2TokenDialogState({ open: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });

    if (result.error) {
      setError('root', { type: 'manual', message: result.error });
    }
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <h2 className="text-size-20 font-semibold text-gray-900">Deposit K2</h2>
      <Form className="pt-0 relative" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="pt-1">
          <div className="text-size-14 text-gray-600">
            Add K2 tokens to your position. Newly deposited K2 begins accruing
            incentives immediately and becomes eligible for unlock after 24h +
            the next daily boundary.
          </div>
          <div className="flex flex-col gap-1 pt-3">
            <div className="flex flex-col gap-1">
              <label className="text-size-14 font-medium">
                Amount to deposit
              </label>
            </div>
            <div className="flex items-start gap-2">
              <Input
                type="number"
                iconSize="sm"
                iconSrc={tokenInfo.iconSrc}
                {...form.register('amount')}
                step={10 ** -tokenInfo.decimals}
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
              Available: {formatAmountWithCommas(Number(tokenBalance))}{' '}
              {tokenInfo.symbol}
            </span>
          </div>
          {formState.errors.root && (
            <RootError
              sticky={false}
              errorMessage={formState.errors.root.message ?? ''}
            />
          )}
        </InputGroup>
        <ButtonGroup className="flex-row">
          <Button
            colors="primary"
            context="flow"
            className="rounded-xl"
            onClick={() => setDepositK2TokenDialogState({ open: false })}
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl"
            colors="secondary"
            context="flow"
            type="submit"
            disabled={
              isSubmitting ||
              !isValidAmount ||
              !!(amount && amount > tokenBalance)
            }
          >
            {isSubmitting ? 'Depositing...' : 'Confirm Deposit'}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
