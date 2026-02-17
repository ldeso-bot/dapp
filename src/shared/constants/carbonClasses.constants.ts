import { base, baseSepolia } from 'viem/chains';
import { ChainId } from './networks.constants';

const BASE_CARBON_CLASSES_INFO_MAP = {
  '0xc83709888c975576c00000000000000000000311': {
    name: 'Ocean Alkalinity Enhancement (OAE)',
    category: 'Carbon Dioxide Removals',
    isRegen: false,
  },
  '0xc83709888c975576c00000000000000000000312': {
    name: 'Enhanced Rock Weathering (ERW)',
    category: 'Carbon Dioxide Removals',
    isRegen: false,
  },
  '0xc83709888c975576c00000000000000000000313': {
    name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
    category: 'Forestry',
    isRegen: false,
  },
  '0xc83709888c975576c00000000000000000000314': {
    name: 'Mangroves (MNGRV)',
    category: 'Blue Carbon',
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
