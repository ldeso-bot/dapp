import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
import { useProtocolData } from './api/useProtocolData';

/**
 * Hook to get next maturity information
 */
export function useNextMaturity() {
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  const timestamp = protocolData?.maturities?.at(0)?.maturationTimestamp ?? 0;
  const daysFromNow = Math.ceil(
    (timestamp - currentTimestamp) / (60 * 60 * 24)
  );

  return {
    timestamp,
    daysFromNow,
  };
}
