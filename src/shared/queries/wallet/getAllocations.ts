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
      carbonClass: 'Mangrooves',
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
      carbonClass: 'Mangrooves',
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
