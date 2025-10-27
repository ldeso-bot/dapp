import { USE_MOCKS } from '@/shared/constants/config.constants';
import { LpToken, tokens } from '@/shared/constants/tokens.constants';
import {
  LiquidityPoolInfo,
  LiquidityPools,
} from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { formatUnits } from 'viem';

export const getLiquidityPools = async (sdk: Sdk): Promise<LiquidityPools> => {
  if (USE_MOCKS) {
    return getMockLiquidityPools();
  }
  const tokensResponse = await sdk.protocol.getTokens();

  const getOneLiquidityPool = (token: LpToken): LiquidityPoolInfo => {
    const tokenInfo = tokens[token];
    const symbol = tokenInfo.subgraphSymbol;
    const tokenSubgraphInfo = tokensResponse.tokens.find(
      (t) => t.symbol === symbol
    );

    const tvl = Number(
      formatUnits(BigInt(tokenSubgraphInfo?.totalAmountLocked ?? '0'), 18)
    );

    // TODO: pending clarification (aerodrome or risky yield)
    const apyPercent = 0.174;

    return {
      token,
      tvl,
      apyPercent,
    };
  };

  console.log(tokensResponse);
  return [getOneLiquidityPool('kvcm-usdc'), getOneLiquidityPool('kvcm-k2')];
};

const getMockLiquidityPools = (): LiquidityPools => {
  return [
    {
      token: 'kvcm-usdc',
      tvl: 2200000,
      apyPercent: 0.123,
    },
    {
      token: 'kvcm-k2',
      tvl: 1200000,
      apyPercent: 0.174,
    },
  ];
};
