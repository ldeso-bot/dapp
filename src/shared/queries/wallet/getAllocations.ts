import { Allocations } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getAllocations = async (
  sdk: Sdk,
  walletAddress: string
): Promise<Allocations> => {
  if (!sdk || !walletAddress) console.log('');
  return [
    {
      id: '1',
      class: 'Water Filtration',
      priceUSD: 3.99,
      amountTonnes: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.1,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '2',
      class: 'Biochar (CHAR)',
      priceUSD: 36.97,
      amountTonnes: 500,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.5,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '3',
      class: 'RNWBL',
      priceUSD: 3.99,
      amountTonnes: 300,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '4',
      class: 'Mangrooves',
      priceUSD: 3.99,
      amountTonnes: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.1,
      token: {
        name: 'kvcm',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '5',
      class: 'Water Filtration',
      priceUSD: 3.99,
      amountTonnes: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'k2',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
    {
      id: '6',
      class: 'Mangrooves',
      priceUSD: 3.99,
      amountTonnes: 100,
      holder: '0x1234567890123456789012345678901234567890',
      sharePercent: 0.3,
      token: {
        name: 'k2',
        address: '0x1234567890123456789012345678901234567890',
      },
    },
  ];
};
