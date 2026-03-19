import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { isLockableToken } from '@/shared/constants/tokens.constants';
import {
  ExtraLockInfo,
  getActiveMaturitiesWithDistribution,
} from '@/shared/queries/protocol/yieldCurve.utils';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { cached } from '@/shared/utils/cache.utils';
import { NextRequest } from 'next/server';
import { isNumber } from 'remeda';

type UntypedExtraLockInfoArgs = {
  token: string | null;
  amount: number | null;
  maturityId: number | null;
};

const getExtraLockInfoArgs = (
  request: NextRequest
): UntypedExtraLockInfoArgs => {
  const token = request.nextUrl.searchParams.get('extraLockToken');
  const amount = Number(request.nextUrl.searchParams.get('extraLockAmount'));
  const maturityId = Number(
    request.nextUrl.searchParams.get('extraLockMaturityId')
  );
  return {
    token,
    amount,
    maturityId,
  };
};

const isExtraLockInfo = (args: unknown): args is ExtraLockInfo => {
  if (typeof args !== 'object' || args === null) {
    return false;
  }

  if (!('token' in args) || !isLockableToken(args.token)) {
    return false;
  }

  if (!('amount' in args) || !isNumber(args.amount) || args.amount <= 0) {
    return false;
  }

  if (
    !('maturityId' in args) ||
    !isNumber(args.maturityId) ||
    args.maturityId <= 0
  ) {
    return false;
  }

  return true;
};

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const unTypedExtraLockInfo = getExtraLockInfoArgs(request);

  if (
    (!!unTypedExtraLockInfo.token ||
      !!unTypedExtraLockInfo.amount ||
      !!unTypedExtraLockInfo.maturityId) &&
    !isExtraLockInfo(unTypedExtraLockInfo)
  ) {
    return Response.json(
      { error: 'Invalid request parameters' },
      { status: 400 }
    );
  }

  const extraLockInfo = isExtraLockInfo(unTypedExtraLockInfo)
    ? unTypedExtraLockInfo
    : undefined;

  const cacheKey = extraLockInfo
    ? [
        'protocol-maturities',
        chainId,
        extraLockInfo.token,
        extraLockInfo.amount,
        extraLockInfo.maturityId,
      ]
    : ['protocol-maturities', chainId];

  const data = await cached(
    async (chainId: ChainId, extraLockInfo: ExtraLockInfo | undefined) => {
      const sdk = getSdk(chainId);
      const maturitiesMap = await getActiveMaturitiesWithDistribution(
        sdk,
        extraLockInfo
      );
      return Object.values(maturitiesMap);
    },
    cacheKey,
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )(chainId, extraLockInfo);

  if (data.length === 0 || (data[0]?.apys.kvcm.kvcmApy ?? 0) <= 0) {
    return Response.json({ error: 'Invalid input data' }, { status: 400 });
  }

  return Response.json(data);
}
