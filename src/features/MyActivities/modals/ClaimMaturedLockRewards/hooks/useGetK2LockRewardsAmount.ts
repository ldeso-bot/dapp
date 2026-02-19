import { tokens } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { zeroAddress } from 'viem';
import { useAccount, useSimulateContract } from 'wagmi';

export const useGetK2LockRewardsAmount = () => {
  const { address: rewardManagerContractAddress } = useContract(
    'RewardManagerDiamond'
  );
  const { address } = useAccount();

  const args = useMemo(() => {
    return address ? ([address] as const) : ([zeroAddress] as const);
  }, [address]);

  const { data: simulation, isLoading } = useSimulateContract({
    address: rewardManagerContractAddress,
    abi: RewardManagerDiamond,
    functionName: 'previewClaimK2StakersRewards',
    args,
    query: {
      enabled: !!rewardManagerContractAddress,
    },
  });

  const rewards = simulation?.result;

  const ryAmount = isNonNullish(rewards)
    ? formatStringToNumber(rewards[0], tokens.kvcm.decimals)
    : undefined;

  const k2Amount = isNonNullish(rewards)
    ? formatStringToNumber(rewards[1], tokens.k2.decimals)
    : undefined;

  return {
    ryAmount,
    k2Amount,
    isLoading,
  };
};
