import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { tokenInfoFromSubgraphSymbol } from '@/shared/constants/tokens.constants';
import { Allocation, Allocations } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { isAllocatableToken } from '@/shared/utils/typeguards';
import { Allocation_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
import { formatUnits } from 'viem';

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
  const mappedAllocations = allocations.allocations.map(
    (allocation): Allocation | null => {
      const tokenInfo = tokenInfoFromSubgraphSymbol(allocation.token.symbol);
      if (!tokenInfo || !isAllocatableToken(tokenInfo.id)) {
        console.warn('❓ Unknown allocation token:', allocation.token.symbol);
        return null;
      }

      return {
        id: allocation.id,
        carbonClass: allocation.carbonClass.id,
        priceUSD: formatStringToNumber(
          allocation.carbonClass.priceUsdcPerTon?.priceUsdc,
          6
        ),
        amount: Number(formatUnits(BigInt(allocation.amount), 18)),
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
      priceUSD: 3.99,
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.1,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '2',
      carbonClass: 'Biochar (CHAR)',
      priceUSD: 36.97,
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
      priceUSD: 3.99,
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
      priceUSD: 3.99,
      amount: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.1,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '5',
      carbonClass: 'Water Filtration',
      priceUSD: 3.99,
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
      priceUSD: 3.99,
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
