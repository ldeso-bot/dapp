'use client';

import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { Lock, WalletData } from '@/shared/models/walletData';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { isNullish } from 'remeda';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import ClaimMaturedLogRewardsForm from './ClaimMaturedLockRewardsForm';
import { useGetKvcmLockRewardsAmount } from './hooks/useGetKvcmLockRewardsAmount';

type Props = {
  lock: Lock;
};
const ClaimKvcmLockRewardsForm = ({ lock }: Props) => {
  const lockId = lock.id;
  const { contract: rewardManagerContract } = useContract(
    'RewardManagerDiamond'
  );
  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );

  const chainId = useChainId();

  const { kvcmAmount, k2Amount, isLoading } = useGetKvcmLockRewardsAmount(lock);

  // Unlock Kvcm
  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) => {
      const lock = walletData?.locks.find((lock) => lock.id === lockId);
      return lock ? lock.claimableRewards.kvcm + lock.claimableRewards.k2 : 0;
    },
  });

  const unlockKvcm =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      // Unlock
      if (!lock.isPartiallyClaimed) {
        const unlockKvcmFn = stakingManagerContract?.write.unlockKvcm;
        if (!unlockKvcmFn) {
          return exitWithErrorMessage('Contract is not ready');
        }
        if (isNullish(lock?.contractLockId)) {
          return exitWithErrorMessage('Lock ID is not ready');
        }

        const transaction = () =>
          unlockKvcmFn([BigInt(lock?.contractLockId)], {
            chainId,
          });

        return executeWithValidation(transaction);
      } else {
        // Claim remaining rewards
        const unlockKvcmFn = rewardManagerContract?.write.claimKVCMK2Rewards;
        if (!unlockKvcmFn) {
          return exitWithErrorMessage('Contract is not ready');
        }
        if (isNullish(lock?.maturityId)) {
          return exitWithErrorMessage('Maturity ID is not ready');
        }

        const transaction = () =>
          unlockKvcmFn([BigInt(lock?.maturityId)], {
            chainId,
          });

        return executeWithValidation(transaction);
      }
    }, [
      stakingManagerContract,
      rewardManagerContract,
      lock,
      executeWithValidation,
      chainId,
    ]);

  return (
    <ClaimMaturedLogRewardsForm
      isLoading={isLoading}
      lock={lock}
      onClaim={unlockKvcm}
      kvcmAmount={kvcmAmount}
      k2Amount={k2Amount}
    />
  );
};

export default ClaimKvcmLockRewardsForm;
