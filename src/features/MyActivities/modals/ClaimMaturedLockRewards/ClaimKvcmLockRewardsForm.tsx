'use client';

import { tokens } from '@/shared/constants/tokens.constants';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract, useContractInfo } from '@/shared/hooks/web3/useContract';
import { Lock, WalletData } from '@/shared/models/walletData';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { useCallback, useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { useReadContract } from 'wagmi';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import ClaimMaturedLogRewardsForm from './ClaimMaturedLogRewardsForm';

type Props = {
  lock: Lock;
};
const ClaimKvcmLockRewardsForm = ({ lock }: Props) => {
  const lockId = lock.id;
  const rewardManagerContractInfo = useContractInfo('RewardManagerDiamond');
  const { contract: stakingManagerContract } = useContract(
    'StakingManagerDiamond'
  );
  const chainId = useChainId();

  // Kvcm amount
  const kvcmAmountArgs = useMemo(() => {
    return lock ? ([BigInt(lock.contractLockId ?? 0)] as const) : undefined;
  }, [lock]);

  const { data: kvcmAmountWei, isLoading } = useReadContract({
    address: rewardManagerContractInfo.address as `0x${string}`,
    abi: RewardManagerDiamond,
    functionName: 'getKvcmLockYield',
    args: kvcmAmountArgs,
    query: {
      enabled: !!lock && !!rewardManagerContractInfo.address,
    },
  });

  const kvcmAmount = isNonNullish(kvcmAmountWei)
    ? formatStringToNumber(kvcmAmountWei, tokens.kvcm.decimals)
    : undefined;

  // K2 amount
  // We cannot get the K2 amount from the blockchain
  const k2Amount = lock?.claimableRewards.k2;

  // Unlock Kvcm
  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.id === lockId)?.status ?? 'LOCKED',
  });

  const unlockKvcm =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      const unlockKvcmFn = stakingManagerContract?.write.unlockKvcm;
      if (!unlockKvcmFn) {
        return exitWithErrorMessage('Contract is not ready');
      }
      if (!lock?.contractLockId) {
        return exitWithErrorMessage('Lock ID is not ready');
      }

      const transaction = () =>
        unlockKvcmFn([BigInt(lock?.contractLockId)], {
          chainId,
        });

      return executeWithValidation(transaction);
    }, [stakingManagerContract, lock, executeWithValidation, chainId]);

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
