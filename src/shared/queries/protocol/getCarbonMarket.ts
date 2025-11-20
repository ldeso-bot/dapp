import { ChainId } from '@/shared/constants/networks.constants';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { CarbonMarket } from '../../models/ProtocolData';

// TODO: Pending decision on how to store categories
export const getCarbonMarket = async (
  chainId: ChainId
): Promise<CarbonMarket> => {
  const sdk = getSdk(chainId);
  if (!sdk) console.log('');
  return [
    {
      category: 'Removal - High Durability',
      capacityTonnes: 2000,
      priceUSD: 70,
      changeUSD: 4.5,
    },
    {
      category: 'Removal - Biochar',
      capacityTonnes: 9000,
      priceUSD: 3,
      changeUSD: 0.0,
    },
    {
      category: 'Removal - NBS',
      capacityTonnes: 8000,
      priceUSD: 10,
      changeUSD: -3,
    },
    {
      category: 'Mitigation - NBS',
      capacityTonnes: 115000,
      priceUSD: 1,
      changeUSD: -1.7,
    },
    {
      category: 'Avoidance - Energy Efficiency',
      capacityTonnes: 3000,
      priceUSD: 9,
      changeUSD: -3.2,
    },
  ];
};
