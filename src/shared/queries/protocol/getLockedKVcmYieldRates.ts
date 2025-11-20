import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../../models/ProtocolData';
import {
  BUCKET_IDS,
  getActiveYieldBuckets,
  getMockLockedVcmYieldRates,
} from './protocol.utils';

export const getLockedKVcmYieldRates = async (
  chainId: ChainId
): Promise<YieldRates> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockLockedVcmYieldRates(BUCKET_IDS.BOND);
  }
  const yieldBuckets = await getActiveYieldBuckets(sdk, BUCKET_IDS.BOND);

  return yieldBuckets;
};
