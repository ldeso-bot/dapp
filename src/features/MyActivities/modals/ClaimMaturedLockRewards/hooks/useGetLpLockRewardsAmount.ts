import { tokens } from '@/shared/constants/tokens.constants';
import { useContract, useContractInfo } from '@/shared/hooks/web3/useContract';
import { Lock } from '@/shared/models/walletData';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { zeroAddress } from 'viem';
import { useAccount, useSimulateContract } from 'wagmi';

export const useGetLpLockRewardsAmount = (lock: Lock) => {
  const { address: rewardManagerContractAddress } = useContract(
    'RewardManagerDiamond'
  );
  const { address } = useAccount();

  const { address: kvcmUsdcAddress } = useContractInfo('KVCM_USDC');
  const { address: kvcmK2Address } = useContractInfo('KVCM_K2');

  const lpTokenAddress = useMemo(() => {
    if (!lock) return undefined;
    return lock.token === 'kvcm-usdc' ? kvcmUsdcAddress : kvcmK2Address;
  }, [lock, kvcmUsdcAddress, kvcmK2Address]);

  const args = useMemo(() => {
    return lock && lpTokenAddress
      ? ([
          lpTokenAddress as `0x${string}`,
          BigInt(lock.maturityId ?? 0),
          address ?? zeroAddress,
        ] as const)
      : undefined;
  }, [lock, lpTokenAddress, address]);

  const { data: simulation, isLoading } = useSimulateContract({
    address: rewardManagerContractAddress,
    abi: RewardManagerDiamond,
    functionName: 'previewClaimLPRewards',
    args,
    query: {
      enabled: !!lock && !!lpTokenAddress && !!rewardManagerContractAddress,
    },
  });

  const rewards = simulation?.result;

  const kvcmAmount = isNonNullish(rewards)
    ? formatStringToNumber(rewards[0], tokens.kvcm.decimals)
    : undefined;

  const k2Amount = isNonNullish(rewards)
    ? formatStringToNumber(rewards[1], tokens.k2.decimals)
    : undefined;

  return {
    kvcmAmount,
    k2Amount,
    isLoading,
  };
};
