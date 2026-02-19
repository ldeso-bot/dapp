import { tokens } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import { Lock } from '@/shared/models/walletData';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { zeroAddress } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export const useGetKvcmLockRewardsAmount = (lock: Lock) => {
  const {
    address: rewardManagerContractAddress,
    contract: rewardManagerContract,
  } = useContract('RewardManagerDiamond');
  const { address } = useAccount();

  // Kvcm amount
  const kvcmAmountArgs = useMemo(() => {
    return lock ? ([BigInt(lock.contractLockId ?? 0)] as const) : undefined;
  }, [lock]);

  const { data: kvcmAmountWei, isLoading: isKvcmAmountLoading } =
    useReadContract({
      address: rewardManagerContract?.address as `0x${string}`,
      abi: RewardManagerDiamond,
      functionName: 'getKvcmLockYield',
      args: kvcmAmountArgs,
      query: {
        enabled: !!lock && !!rewardManagerContract?.address,
      },
    });

  const kvcmAmount = isNonNullish(kvcmAmountWei)
    ? formatStringToNumber(kvcmAmountWei, tokens.kvcm.decimals)
    : undefined;

  // K2 amount
  const k2AmountArgs = useMemo(() => {
    return lock
      ? ([BigInt(lock.maturityId ?? 0), address ?? zeroAddress] as const)
      : undefined;
  }, [lock, address]);

  const { data: k2AmountWei, isLoading: isK2AmountLoading } = useReadContract({
    address: rewardManagerContractAddress,
    abi: RewardManagerDiamond,
    functionName: 'previewClaimKVCMK2Rewards',
    args: k2AmountArgs,
    query: {
      enabled: !!lock && !!rewardManagerContractAddress,
    },
  });

  const k2Amount = isNonNullish(k2AmountWei)
    ? formatStringToNumber(k2AmountWei, tokens.k2.decimals)
    : undefined;

  return {
    kvcmAmount,
    k2Amount,
    isLoading: isKvcmAmountLoading || isK2AmountLoading,
  };
};
