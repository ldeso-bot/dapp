'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { RootError } from '@/shared/components/Form/RootError';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { delay } from '@/shared/utils/date.utils';
import { parseAmount } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
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
    ? parseAmount(amount, tokenInfo.decimals)
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
      successDescription: (
        <>
          <div>
            Deposited {amount} K2! Each deposit becomes unlock-eligible after
            one full incentives period.
          </div>

          <div style={{ marginTop: 8 }}>
            <strong>
              Your incentives are calculated daily, but they may not show up in
              the UI for up to 24 hours.
            </strong>
          </div>
        </>
      ),
      errorDescription:
        'Something went wrong and your deposit was not successful.',
      successEvent: {
        name: 'deposit_k2',
        payload: { amount },
      },
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
      <h2 className="text-size-20 font-semibold text-text-1">Deposit K2</h2>
      <Form
        className="pt-0 relative"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputGroup className="pt-1">
          <div className="text-size-14 text-text-2">
            Lock K2 tokens. Newly deposited K2 begins accruing variable
            incentives immediately and becomes eligible for unlocking after 24
            hours and at the next daily cutoff.
          </div>
          <p className="text-size-14 font-bold text-text-2">
            Incentives are calculated daily, but they may not show up in the UI
            for up to 24 hours.
          </p>
          <TokenAmountInput
            control={form.control}
            name="amount"
            label="Amount to deposit"
            iconSrc={tokenInfo.iconSrc}
            error={formState.errors.amount}
            availableBalance={tokenBalance}
          />
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
            className="rounded-xl border-border-strong"
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
