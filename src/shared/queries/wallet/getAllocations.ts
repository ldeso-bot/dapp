import { getCarbonClassInfo } from '@/shared/constants/carbonClasses.constants';
import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  isAllocatableToken,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { Allocation, Allocations } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { Allocation_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';

export const getAllocations = async (
  chainId: ChainId,
  walletAddress: string
): Promise<Allocations> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockAllocations();
  }

  // Fetch allocations
  const allocations = await sdk.protocol.getAllocations({
    where: {
      account_: {
        id: walletAddress,
      },
    } as Allocation_Filter,
  });

  // Map allocations
  const mappedAllocations = (allocations?.allocations ?? []).map(
    (allocation): Allocation | null => {
      const tokenInfo = tokenInfoFromSubgraphSymbol(allocation.token.symbol);
      if (!tokenInfo || !isAllocatableToken(tokenInfo.id)) {
        console.warn('❓ Unknown allocation token:', allocation.token.symbol);
        return null;
      }

      const priceUSD = formatStringToNumber(
        allocation.carbonClass.priceUsdcPerTon?.priceUsdc,
        6
      );

      const getPriceEffect = (price: number) => {
        if (price < 10) return 'Low' as const;
        if (price < 25) return 'Medium' as const;
        return 'High' as const;
      };

      const carbonClassId = allocation.carbonClass.carbonClassId.toLowerCase();      
      const carbonClassInfo = getCarbonClassInfo(chainId, carbonClassId);
      const category = carbonClassInfo?.category ?? 'Other';
      const contractLockId = allocation.lock?.contractLockId
        ? formatStringToNumber(allocation.lock.contractLockId, 0)
        : undefined;
      const maturityId = allocation.lock?.maturityId
        ? formatStringToNumber(allocation.lock.maturityId, 0)
        : undefined;
      const lockedUntil = allocation.lock?.maturity?.timestamp
        ? formatStringToNumber(allocation.lock.maturity.timestamp, 0)
        : undefined;

      return {
        priceUSD,
        category,
        id: allocation.id,
        carbonClass: carbonClassId,
        priceEffect: getPriceEffect(priceUSD),
        amount: formatStringToNumber(allocation.amount, 18),
        holder: allocation.account.id,
        sharePercent: Number(
          allocation.token.totalAmountAllocated
            ? BigInt(allocation.amount) /
                BigInt(allocation.token.totalAmountAllocated)
            : 0
        ),
        token: {
          name: tokenInfo.id,
          address: allocation.token.address,
        },
        contractLockId,
        maturityId,
        lockedUntil,
      };
    }
  );

  // Cull and return allocations
  return filter(mappedAllocations, isNonNullish);
};

const getMockAllocations = (): Allocations => {
  return [
    {
      id: '1',
      carbonClass: 'Water Filtration',
      category: 'Carbon Dioxide Removals',
      priceUSD: 3.99,
      priceEffect: 'Low',
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.9,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '2',
      carbonClass: 'Biochar (CHAR)',
      category: 'Renewables',
      priceUSD: 36.97,
      priceEffect: 'High',
      amount: 500,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.5,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '3',
      carbonClass: 'RNWBL',
      category: 'Forestry',
      priceUSD: 3.99,
      priceEffect: 'Low',
      amount: 300,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '4',
      carbonClass: 'Mangroves (MNGRV)',
      category: 'Renewables',
      priceUSD: 15.5,
      priceEffect: 'Medium',
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.5,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '5',
      carbonClass: 'Water Filtration',
      category: 'Carbon Dioxide Removals',
      priceUSD: 3.99,
      priceEffect: 'Low',
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'k2',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '6',
      carbonClass: 'Mangroves (MNGRV)',
      category: 'Renewables',
      priceUSD: 15.5,
      priceEffect: 'Medium',
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'k2',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
  ];
};
