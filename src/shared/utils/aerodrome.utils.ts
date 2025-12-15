import { getContract, getPublicClient } from '@/shared/utils/web3.utils';
import { unstable_cache } from 'next/cache';
import { base, baseSepolia } from 'viem/chains';
import { IS_DEVELOPMENT } from '../constants/config.constants';
import contracts from '../constants/contracts.constants';
import { AERODROME_LIQUIDITY_DECIMALS } from '../constants/tokens.constants';
import { formatStringToNumber } from './subgraph.utils';

type Pool = {
  lp: string;
  symbol: string;
  decimals: number;
  liquidity: bigint;
  type: bigint;
  tick: bigint;
  sqrt_ratio: bigint;
  token0: string;
  reserve0: bigint;
  staked0: bigint;
  token1: string;
  reserve1: bigint;
  staked1: bigint;
  gauge: string;
  gauge_liquidity: bigint;
  gauge_alive: boolean;
  fee: string;
  bribe: string;
  factory: string;
  emissions: bigint;
  emissions_token: string;
  emissions_cap: bigint;
  pool_fee: bigint;
  unstaked_fee: bigint;
  token0_fees: bigint;
  token1_fees: bigint;
  locked: bigint;
  emerging: bigint;
  created_at: number;
  nfpm: string;
  alm: string;
  root: string;
};

type KlimaProtocolPools = {
  pool: Pool;
  index: number;
}[];

/**
 * Finds the KlimaProtocol pools using the Velodrome Sugar contract
 * @param chainId - The chain ID to query
 * @param filter - Optional filter parameter (default: 0)
 * @returns Array of all pools
 */
export const getKlimaProtocolPools = async (): Promise<KlimaProtocolPools> => {
  const chainId = base.id;
  const publicClient = getPublicClient(chainId);
  const contract = getContract(chainId, 'VelodromeSugar', publicClient);

  // Get total count of pools
  const totalCount = (await contract.read.count()) as bigint;
  const totalPools = Number(totalCount);

  // Fetch pools in batches of 100 - Sequentially to avoid rate limiting
  const batchSize = 100;
  const totalBatches = Math.ceil(totalPools / batchSize);

  const res: KlimaProtocolPools = [];

  for (let i = 0; i < totalBatches; i++) {
    const offset = i * batchSize;
    const limit = Math.min(batchSize, totalPools - offset);

    const pools = (await contract.read.all([
      BigInt(limit),
      BigInt(offset),
      0n,
    ])) as Pool[];

    // Lookup Klima Protocol pools in the batch
    let index = 0;
    for (const pool of pools) {
      if (
        pool.token0 === contracts.KVCM[base.id] &&
        pool.token1 === contracts.USDC[base.id]
      ) {
        res.push({
          pool,
          index: offset + index,
        });
      }
      if (
        pool.token0 === contracts.KVCM[base.id] &&
        pool.token1 === contracts.K2[base.id]
      ) {
        res.push({
          pool,
          index,
        });
      }
      index++;
    }
  }

  return res;
};

/** Returns a pool by index from the Velodrome Sugar contract */
const getAerodromePoolByIndex = async (
  index: number
): Promise<Pool | undefined> => {
  const chainId = base.id;
  const publicClient = getPublicClient(chainId);
  const contract = getContract(chainId, 'VelodromeSugar', publicClient);

  const pool = (await contract.read.all([1n, BigInt(index), 0n])) as Pool[];

  return pool[0];
};

const getTokenDecimals = (address: string): number => {
  if (
    address.toLowerCase() === contracts.USDC[base.id].toLowerCase() ||
    address.toLowerCase() === contracts.USDC[baseSepolia.id].toLowerCase()
  ) {
    return 6;
  }
  return 18;
};

/**
 * Caches and converts raw pool data into a more usable format
 * @param index
 * @returns
 */
export const getAerodromePoolInfoByIndex = async (index: number) => {
  const pool = await getAerodromePoolByIndex(index);
  // If the pool is not found we gracefully return
  if (!pool) {
    console.error('Pool not found');
    return {
      reserve0: 0,
      reserve1: 0,
      emissions: 0,
      liquidity: 0,
    };
  }

  // If the pool does not emit aero. All further calculations will be wrong. We prefer returning 0
  let emissions = 0;
  if (
    pool.emissions_token.toLowerCase() === contracts.AERO[base.id].toLowerCase()
  ) {
    emissions = formatStringToNumber(pool.emissions, pool.decimals);
  }

  return unstable_cache(
    async () => {
      return {
        reserve0: formatStringToNumber(
          pool.reserve0,
          getTokenDecimals(pool.token0)
        ),
        reserve1: formatStringToNumber(
          pool.reserve1,
          getTokenDecimals(pool.token1)
        ),
        emissions,
        liquidity: formatStringToNumber(
          pool.liquidity,
          AERODROME_LIQUIDITY_DECIMALS
        ),
      };
    },
    [`aerodrome-pool-by-index-${index}`],
    {
      revalidate: IS_DEVELOPMENT ? 1 : 3600,
    }
  )();
};
