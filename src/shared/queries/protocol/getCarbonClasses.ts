import {
  CARBON_CLASSES_INFO_MAP,
  isCarbonClassId,
} from '@/shared/constants/carbonClasses.constants';
import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { CreditToken_Filter } from '@generated/gql/types/carbon.types';
import { CarbonClass_Filter } from '@generated/gql/types/protocol.types';
import { mapToObj } from 'remeda';
import { formatUnits } from 'viem';
import { CarbonClass } from '../../models/ProtocolData';

export const getCarbonClasses = async (
  chainId: ChainId
): Promise<CarbonClass[]> => {
  const sdk = getSdk(chainId);

  if (USE_MOCKS) {
    return getMockCarbonClasses();
  }

  // Get carbon classes
  const response = await sdk.protocol.getCarbonClasses({
    where: { isRegistered: true } as CarbonClass_Filter,
  });

  const carbonClasses = response?.carbonClasses ?? [];

  // Create a map of all involved registered tokens
  const registeredTokenIds = carbonClasses.flatMap(
    (c) => c.registeredCredits?.map((r) => r.creditTokenId) ?? []
  );

  const registeredTokens = (
    await sdk.carbon.getCreditTokens({
      where: { creditTokenId_in: registeredTokenIds } as CreditToken_Filter,
    })
  ).creditTokens;

  const registeredTokensMap = mapToObj(registeredTokens, (t) => [
    t.creditTokenId,
    t,
  ]);

  //Compute carbon classes
  return carbonClasses?.map((c) => {
    // Add up the supply tonnes of all registered tokens
    const supplyTonnes = c.registeredCredits.reduce(
      (acc, r) =>
        acc + (registeredTokensMap[r.creditTokenId]?.totalSupplyTonnes ?? 0),
      0
    );

    const carbonClassId = c.carbonClassId.toLowerCase();

    const carbonClassInfo = isCarbonClassId(carbonClassId)
      ? CARBON_CLASSES_INFO_MAP[carbonClassId]
      : null;

    return {
      name: carbonClassInfo?.name ?? c.id,
      category: carbonClassInfo?.category ?? 'Other',
      priceUSD: Number(
        formatUnits(BigInt(c.priceUsdcPerTon?.priceUsdc ?? '0'), 6)
      ),
      supplyTonnes,
    };
  });
};

const getMockCarbonClasses = (): CarbonClass[] => {
  return [
    {
      name: 'Ocean Alkalinity Enhancement (OAE)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 12.04,
      supplyTonnes: 1000,
    },
    {
      name: 'Enhanced Rock Weathering (ERW)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 3.99,
      supplyTonnes: 1000,
    },
    {
      name: 'Nature Based CDR (NBCDR)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 1.02,
      supplyTonnes: 1000,
    },
    {
      name: 'Biochar (CHAR)',
      category: 'Carbon Dioxide Removals',
      priceUSD: 36.97,
      supplyTonnes: 1000,
    },
    {
      name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
      category: 'Forestry',
      priceUSD: 12.04,
      supplyTonnes: 1000,
    },
    {
      name: 'Afforestation, Reforestation, and Revegetation (ARR)',
      category: 'Forestry',
      priceUSD: 3.99,
      supplyTonnes: 1000,
    },
    {
      name: 'Improved Forest Management (IFM)',
      category: 'Forestry',
      priceUSD: 1.02,
      supplyTonnes: 1000,
    },
    {
      name: 'Mangroves (MNGRV)',
      category: 'Blue Carbon',
      priceUSD: 12.04,
      supplyTonnes: 1000,
    },
    {
      name: 'Water Filtration',
      category: 'Blue Carbon',
      priceUSD: 3.99,
      supplyTonnes: 1000,
    },
    {
      name: 'RNWBL',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 12.04,
      supplyTonnes: 1000,
    },
    {
      name: 'Cookstoves',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 3.99,
      supplyTonnes: 1000,
    },
    {
      name: 'Landfill Gas',
      category: 'Carbon Dioxide Avoidance',
      priceUSD: 1.02,
      supplyTonnes: 1000,
    },
  ];
};
