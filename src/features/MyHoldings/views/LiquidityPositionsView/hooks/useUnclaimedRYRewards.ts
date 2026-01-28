import { useContractInfo } from '@/shared/hooks/web3/useContract';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { useAccount, useReadContract } from 'wagmi';

export function useUnclaimedRYRewards(
  lpToken: `0x${string}`,
  maturityId: bigint
) {
  const { address } = useAccount();
  const { address: contractAddress } = useContractInfo('RewardManagerDiamond');

  const result = useReadContract({
    address: contractAddress,
    abi: RewardManagerDiamond,
    functionName: 'getUnclaimedRYRewards',
    args:
      address && lpToken && maturityId
        ? [lpToken, maturityId, address]
        : undefined,
    query: {
      enabled: !!address && !!lpToken && !!maturityId,
    },
  });

  return {
    ...result,
    data: result.data as bigint | undefined,
  };
}
