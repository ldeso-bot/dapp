'use client';

import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
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
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  unlockK2TokenDialogAtom,
  UnlockTokenFields,
} from '../unlockK2Token.utils';

export const useUnlockK2 = (form: UseFormReturn<UnlockTokenFields>) => {
  const unlockTokenDialogState = useAtomValue(unlockK2TokenDialogAtom);
  const lock = unlockTokenDialogState.lock;

  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );
  const chainId = useChainId();

  const { executeWithValidation, isExecuting } =
    useTransactionAndWaitForWalletUpdate({
      valueFetcher: (walletData: WalletData) =>
        walletData?.locks.find((l) => l.id === lock?.id)?.lockedAmount ?? 0,
    });

  const unlockK2 =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      try {
        const unlockK2 = stakingManagerContract?.write.unlockK2;
        if (!unlockK2) {
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
          unlockK2([amountWei], {
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

  return {
    unlockK2,
    isExecuting,
    lock,
  };
};
