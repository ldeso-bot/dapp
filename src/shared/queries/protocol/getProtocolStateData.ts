import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { ONE_MATURITY_PERIOD } from '@/shared/constants/protocol.constants';
import { ProtocolState } from '@/shared/models/ProtocolData';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { getProtocolState } from './protocol.utils';

export const getProtocolStateData = async (
  chainId: ChainId
): Promise<ProtocolState> => {
  const sdk = getSdk(chainId);

  if (USE_MOCKS) {
    return getMockProtocolState();
  }

  const protocolState = await getProtocolState(sdk);

  if (!protocolState) {
    throw new Error('Protocol state not found');
  }

  return {
    protocolStartTimestamp: protocolState.protocolStartTimestamp,
    maturityPeriod: protocolState.maturityPeriod,
    firstActiveMaturityId: protocolState.firstActiveMaturityId,
    lastActiveMaturityId: protocolState.lastActiveMaturityId,
    midnightIndex: protocolState.midnightIndex,
  };
};

const getMockProtocolState = (): ProtocolState => {
  const now = Math.floor(Date.now() / 1000);
  const protocolStartTimestamp = now - 30 * ONE_MATURITY_PERIOD;
  const maturityPeriod = ONE_MATURITY_PERIOD;
  const firstActiveMaturityId = 1;
  const lastActiveMaturityId = 40;

  return {
    protocolStartTimestamp,
    maturityPeriod,
    firstActiveMaturityId,
    lastActiveMaturityId,
    midnightIndex: 0,
  };
};
