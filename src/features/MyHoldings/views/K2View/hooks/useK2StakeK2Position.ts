import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi';
import { useContractInfo } from '@/shared/hooks/web3/useContract';

interface K2StakerPositionView {
  shares: bigint;
  pendingYield: bigint;
  claimableYield: bigint;
}

export function useK2StakeK2Position() {
  const { address } = useAccount();
  const { address: contractAddress, abi } = useContractInfo('RewardManagerDiamond');

  const result = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getK2StakersK2YieldPosition',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    ...result,
    data: result.data as K2StakerPositionView | undefined,
  };
}