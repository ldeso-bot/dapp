'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { parseAmount } from '@/shared/utils/string.utils';
import {
  exitWithErrorMessage,
  handleWeb3Error,
} from '@/shared/utils/web3.utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import {
  unlockK2TokenDialogAtom,
  UnlockTokenFields,
} from '../unlockK2Token.utils';

const UnlockK2TokenConfirm: FormFlowStep<UnlockTokenFields> = ({
  previous,
  data,
}) => {
  const { form } = data;
  const { formState } = form;

  const setAlert = useSetAtom(alertAtom);
  const unlockTokenDialogState = useAtomValue(unlockK2TokenDialogAtom);
  const lock = unlockTokenDialogState.lock;
  const setUnlockTokenDialogState = useSetAtom(unlockK2TokenDialogAtom);

  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );
  const chainId = useChainId();

  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((l) => l.id === lock?.id)?.lockedAmount ?? 0,
  });

  const unlockK2 =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      try {
        if (!stakingManagerContract) {
          return exitWithErrorMessage('Contract is not ready');
        }
        if (!lock) {
          return exitWithErrorMessage('Lock is not ready');
        }

        const amount = form.watch('amount');
        if (!amount || amount <= 0) {
          return exitWithErrorMessage('Amount must be greater than 0');
        }

        const amountWei = parseAmount(amount, tokens.k2.decimals);

        const transaction = () =>
          stakingManagerContract.write.unlockK2([amountWei], {
            chainId,
          });

        return await executeWithValidation(transaction);
      } catch (error) {
        console.error('❌ Unlock K2 error:', error);
        return {
          ...handleWeb3Error(error),
          hash: null,
        };
      }
    }, [stakingManagerContract, lock, form, executeWithValidation, chainId]);

  if (!lock) return null;

  const onSubmit = async () => {
    const result = await unlockK2();

    if (result.error) {
      setAlert({
        title: 'Unlock Failed',
        description: result.error,
        type: 'error',
      });
      return;
    }

    setAlert({
      title: 'Unlock Successful',
      description: `You've successfully unlocked ${form.watch('amount')} of your ${tokens[lock.token].symbol} tokens! You can manage your positions in the "My Activities" dashboard.`,
      type: 'success',
      links: [
        {
          label: 'My Activities',
          href: ROUTES.MY_ACTIVITIES,
        },
      ],
    });
    setUnlockTokenDialogState({ open: false, lock: null });
  };

  return (
    <Card title="Confirm your transaction">
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 pt-3">
          Give the transaction one final review before submitting to the
          blockchain.
          <Input
            label="Amount to unlock"
            value={`${form.watch('amount')} K2`}
            iconSrc={tokens[lock.token].iconSrc}
            error={formState.errors.amount}
            readOnly={true}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Submit
          </Button>
          <Button colors="primary" context="flow" onClick={previous}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UnlockK2TokenConfirm;
