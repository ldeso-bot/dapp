import { base, baseSepolia } from 'viem/chains';
import { ChainId } from './networks.constants';

const BASE_CARBON_CLASSES_INFO_MAP = {
  '0x1b597da36afa2e88c3dca55b4143251d4eb0e3da': {
    name: 'Ocean Alkalinity Enhancement',
    category: 'CDR',
    isRegen: false,
  },
  '0x4d6fce4eb76f093f5948dcb7ff4364427d70bcb8': {
    name: 'Biochar',
    category: 'CDR',
    isRegen: false,
  },
  '0xf4699531e0a5f6e9351a36de3753deaad329bf45': {
    name: 'Regen Network - City Forest Credits',
    category: 'City Forest Credits',
    isRegen: true,
  },
  '0x1ff9bd464155d32fd2f9d302008d38544c0ae371': {
    name: 'Solar PV - Small Scale',
    category: 'Solar Energy',
    isRegen: false,
  },
  '0x0008f35758a4318942ecb5d5414116ce7b1ede2d': {
    name: 'Wind Energy - Small Scale',
    category: 'Wind Energy',
    isRegen: false,
  },
};

const BASE_SEPOLIA_CARBON_CLASSES_INFO_MAP = {
  '0x64e2c0ccf5c4ac629efe5c9de3a6efa5f018a966': {
    name: 'Regen Network',
    category: 'Carbon Dioxide Removals',
    isRegen: true,
  },
};

const isBaseCarbonClassId = (
  carbonClassId: unknown
): carbonClassId is keyof typeof BASE_CARBON_CLASSES_INFO_MAP => {
  return (
    typeof carbonClassId === 'string' &&
    carbonClassId in BASE_CARBON_CLASSES_INFO_MAP
  );
};

const isBaseSepoliaCarbonClassId = (
  carbonClassId: unknown
): carbonClassId is keyof typeof BASE_SEPOLIA_CARBON_CLASSES_INFO_MAP => {
  return (
    typeof carbonClassId === 'string' &&
    carbonClassId in BASE_SEPOLIA_CARBON_CLASSES_INFO_MAP
  );
};

export const getCarbonClassInfo = (chainId: ChainId, carbonClassId: string) => {
  if (chainId === base.id) {
    return isBaseCarbonClassId(carbonClassId)
      ? BASE_CARBON_CLASSES_INFO_MAP[carbonClassId]
      : null;
  } else if (chainId === baseSepolia.id) {
    return isBaseSepoliaCarbonClassId(carbonClassId)
      ? BASE_SEPOLIA_CARBON_CLASSES_INFO_MAP[carbonClassId]
      : // Auto mock testnet carbon classes
        {
          name: `Test Carbonclass ${carbonClassId.substring(2, 5)}`,
          category: 'Test Category',
          isRegen: false,
        };
  }
  return null;
};
