'use client';

import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { Lock, WalletData } from '@/shared/models/walletData';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { isNonNullish } from 'remeda';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import ClaimMaturedLogRewardsForm from './ClaimMaturedLogRewardsForm';

type Props = {
  lock: Lock;
};

const ClaimK2LockRewardsForm = ({ lock }: Props) => {
  const lockId = lock.id;
  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );

  const chainId = useChainId();

  // Cannot get the amounts from the blockchain yet
  const kvcmAmount = isNonNullish(lock)
    ? lock.claimableRewards.kvcm
    : undefined;

  const k2Amount = isNonNullish(lock) ? lock.claimableRewards.k2 : undefined;

  // Claim K2
  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.id === lockId)?.isClaimable ?? true,
  });

  const claimK2 =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      if (!stakingManagerContract) {
        return exitWithErrorMessage('Contract is not ready');
      }

      const transaction = () =>
        stakingManagerContract.write.claimK2([], {
          chainId,
        });

      return executeWithValidation(transaction);
    }, [stakingManagerContract, executeWithValidation, chainId]);

  return (
    <ClaimMaturedLogRewardsForm
      isLoading={!lock}
      lock={lock}
      onClaim={claimK2}
      kvcmAmount={kvcmAmount}
      k2Amount={k2Amount}
    />
  );
};

export default ClaimK2LockRewardsForm;
