import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { Allocation } from '@/shared/models/walletData';

export const useCarbonClass = (allocation: Allocation | null | undefined) => {
  const { data: protocolData } = useProtocolData();
  if (!allocation?.carbonClass || !protocolData?.carbonClasses) {
    return undefined;
  }
  return protocolData.carbonClasses.find(
    (c) => c.carbonClassId.toLowerCase() === allocation.carbonClass.toLowerCase()
  );
};

