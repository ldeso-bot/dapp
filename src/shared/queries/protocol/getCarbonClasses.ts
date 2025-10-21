import { USE_MOCKS } from '@/shared/constants/config.constants';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { formatUnits } from 'viem';
import { CarbonClass } from '../../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonClasses = async (sdk: Sdk): Promise<CarbonClass[]> => {
  if (USE_MOCKS) {
    return getMockCarbonClasses();
  }
  const response = await sdk.protocol.getCarbonClasses();

  //
  return response?.carbonClasses?.map((c) => ({
    // DEV: how should we get the name and category
    name: c.id,
    category: '',
    priceUSD: Number(
      formatUnits(BigInt(c.priceUsdcPerTon?.priceUsdc ?? '0'), 6)
    ),
  }));
};

const getMockCarbonClasses = (): CarbonClass[] => {
  return [
    {
      name: 'Ocean Alkalinity Enhancement (OAE)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 12.04,
    },
    {
      name: 'Enhanced Rock Weathering (ERW)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 3.99,
    },
    {
      name: 'Nature Based CDR (NBCDR)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 1.02,
    },
    {
      name: 'Biochar (CHAR)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 36.97,
    },
    {
      name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
      category: 'Forestry',
      priceUSD: 12.04,
    },
    {
      name: 'Afforestation, Reforestation, and Revegetation (ARR)',
      category: 'Forestry',
      priceUSD: 3.99,
    },
    {
      name: 'Improved Forest Management (IFM)',
      category: 'Forestry',
      priceUSD: 1.02,
    },
    {
      name: 'Mangroves (MNGRV)',
      category: 'Blue Carbon',
      priceUSD: 12.04,
    },
    {
      name: 'Water Filtration',
      category: 'Blue Carbon',
      priceUSD: 3.99,
    },
    {
      name: 'RNWBL',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 12.04,
    },
    {
      name: 'Cookstoves',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 3.99,
    },
    {
      name: 'Landfill Gas',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 1.02,
    },
  ];
};
