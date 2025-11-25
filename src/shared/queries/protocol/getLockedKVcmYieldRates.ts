import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { YieldRates, YieldType } from '../../models/ProtocolData';
import { getMockLockedVcmYieldRates, getYieldRates } from './protocol.utils';

export const getLockedKVcmYieldRates = async (
  chainId: ChainId
): Promise<YieldRates> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockLockedVcmYieldRates(YieldType.SYNTHETIC);
  }
  const yieldBuckets = await getYieldRates(sdk, YieldType.SYNTHETIC);

  return yieldBuckets;
};
