import { LockableToken } from '@/shared/constants/tokens.constants';
import { Maturity } from '@/shared/models/ProtocolData';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from '../web3/useChainId';
import { useApi } from './useApi';

type ExtraLockInfo = {
  token: LockableToken;
  amount: number;
  maturityId: number;
};

export function useMaturities(extraLockInfo?: ExtraLockInfo) {
  const { get } = useApi();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['protocol-maturities', chainId, extraLockInfo],
    queryFn: () => {
      const queryParams: Record<string, string> = {};
      if (extraLockInfo) {
        queryParams.extraLockToken = extraLockInfo.token;
        queryParams.extraLockAmount = (extraLockInfo.amount || 0).toString();
        queryParams.extraLockMaturityId = extraLockInfo.maturityId.toString();
      }
      return get<Maturity[]>('/api/protocol-data/maturities', queryParams);
    },
  });
}
