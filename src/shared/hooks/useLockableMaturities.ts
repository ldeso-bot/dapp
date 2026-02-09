import { ONE_DAY } from '@/shared/constants/protocol.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
import { useMemo } from 'react';

export const useLockableMaturities = () => {
  const currentTimestamp = useCurrentTimestamp();
  const { data: protocolData } = useProtocolData();

  const lockableMaturities = useMemo(
    () =>
      protocolData?.maturities.filter(
        (maturity) => maturity.maturationTimestamp > currentTimestamp + ONE_DAY
      ) ?? [],
    [protocolData?.maturities, currentTimestamp]
  );

  return lockableMaturities;
};