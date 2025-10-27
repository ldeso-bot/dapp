import { USE_MOCKS } from '@/shared/constants/config.constants';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../../models/ProtocolData';
import {
  BUCKET_IDS,
  getActiveYieldBuckets,
  getMockLockedVcmYieldRates,
} from './protocol.utils';

export const getLockedKVcmYieldRates = async (
  sdk: Sdk
): Promise<YieldRates> => {
  if (USE_MOCKS) {
    return getMockLockedVcmYieldRates(BUCKET_IDS.BOND);
  }
  const yieldBuckets = await getActiveYieldBuckets(sdk, BUCKET_IDS.BOND);

  return yieldBuckets;
};
