'use client';

import { useLock } from '@/shared/hooks/api/useLock';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract, useContractInfo } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { useCallback, useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import ClaimMaturedLogRewardsForm from './ClaimMaturedLogRewardsForm';

type Props = {
  lockId: string;
};

const ClaimLpLockRewardsForm = ({ lockId }: Props) => {
  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );

  const chainId = useChainId();
  const { data: lock } = useLock(lockId);

  const { address: kvcmUsdcAddress } = useContractInfo('KVCM_USDC');
  const { address: kvcmK2Address } = useContractInfo('KVCM_K2');

  const lpTokenAddress = useMemo(() => {
    return lock?.token === 'kvcm-usdc' ? kvcmUsdcAddress : kvcmK2Address;
  }, [lock, kvcmUsdcAddress, kvcmK2Address]);

  // Cannot get the amounts from the blockchain yet
  const kvcmAmount = isNonNullish(lock)
    ? lock.claimableRewards.kvcm
    : undefined;

  const k2Amount = isNonNullish(lock) ? lock.claimableRewards.k2 : undefined;

  // Unlock LP
  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.id === lockId)?.status ?? 'LOCKED',
  });

  const unlockKvcm =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      if (!stakingManagerContract) {
        return exitWithErrorMessage('Contract is not ready');
      }
      if (!lock?.contractLockId) {
        return exitWithErrorMessage('Lock ID is not ready');
      }

      const transaction = () =>
        stakingManagerContract.write.unstakeLP(
          [lpTokenAddress, BigInt(lock?.maturityId)],
          {
            chainId,
          }
        );

      return executeWithValidation(transaction);
    }, [
      stakingManagerContract,
      lock,
      executeWithValidation,
      chainId,
      lpTokenAddress,
    ]);

  return (
    <ClaimMaturedLogRewardsForm
      isLoading={!lock}
      lock={lock}
      onClaim={unlockKvcm}
      kvcmAmount={kvcmAmount}
      k2Amount={k2Amount}
    />
  );
};

export default ClaimLpLockRewardsForm;
