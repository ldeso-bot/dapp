'use client';

import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { Lock, WalletData } from '@/shared/models/walletData';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import ClaimMaturedLogRewardsForm from './ClaimMaturedLockRewardsForm';
import { useGetK2LockRewardsAmount } from './hooks/useGetK2LockRewardsAmount';

type Props = {
  lock: Lock;
};

const ClaimK2LockRewardsForm = ({ lock }: Props) => {
  const lockId = lock.id;
  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );

  const chainId = useChainId();

  const {
    ryAmount: kvcmAmount,
    k2Amount,
    isLoading: isAmountsLoading,
  } = useGetK2LockRewardsAmount();

  // Claim K2
  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.id === lockId)?.isClaimable ?? true,
  });

  const claimK2 =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      const claimK2Fn = stakingManagerContract?.write.claimK2;
      if (!claimK2Fn) {
        return exitWithErrorMessage('Contract is not ready');
      }

      const transaction = () =>
        claimK2Fn([], {
          chainId,
        });

      return executeWithValidation(transaction);
    }, [stakingManagerContract, executeWithValidation, chainId]);

  return (
    <ClaimMaturedLogRewardsForm
      isLoading={!lock || isAmountsLoading}
      lock={lock}
      onClaim={claimK2}
      kvcmAmount={kvcmAmount}
      k2Amount={k2Amount}
    />
  );
};

export default ClaimK2LockRewardsForm;
