import {
  CARBON_CLASSES_INFO_MAP,
  isCarbonClassId,
} from '@/shared/constants/carbonClasses.constants';
import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { CreditToken_Filter } from '@generated/gql/types/carbon.types';
import {
  CarbonClass_Filter,
  TokenSnapshot_Filter,
} from '@generated/gql/types/protocol.types';
import { mapToObj } from 'remeda';
import { CarbonClass } from '../../models/ProtocolData';
import { getHoursSinceEpoch24HoursAgo } from './protocol.utils';

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

  // Create a list of all involved registered tokens
  const registeredTokenIds = carbonClasses.flatMap(
    (c) => c.registeredCredits?.map((r) => r.creditTokenId) ?? []
  );

  // Create a list of carbonClassIds

  const [registeredTokensResponse, ...tokenSnapshotsResponses] =
    await Promise.all([
      sdk.carbon.getCreditTokens({
        where: { creditTokenId_in: registeredTokenIds } as CreditToken_Filter,
      }),
      ...carbonClasses.map((carbonClass) =>
        sdk.protocol
          .getTokenSnapshots({
            where: {
              hoursSinceEpoch_lte: getHoursSinceEpoch24HoursAgo().toString(),
              tokenAddress: carbonClass.carbonClassId,
            } as TokenSnapshot_Filter,
          })
          .then((response) => response.tokenSnapshots[0])
      ),
    ]);

  const registeredTokensMap = mapToObj(
    registeredTokensResponse.creditTokens,
    (t) => [t.creditTokenId, t]
  );

  const tokenSnapshotsMap = mapToObj(tokenSnapshotsResponses, (t) => [
    t?.tokenAddress ?? '',
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

    const valueUSD = formatStringToNumber(c.priceUsdcPerTon?.priceUsdc, 6);

    // Compute the price change over 24 hours
    const snapshot = tokenSnapshotsMap[c.carbonClassId];

    const snapshotPriceUsdc = snapshot?.priceUsdc
      ? formatStringToNumber(snapshot.priceUsdc, 6)
      : valueUSD;

    const valueUSDChangePercent24h = valueUSD
      ? (valueUSD - snapshotPriceUsdc) / snapshotPriceUsdc
      : 0;

    const carbonClassId = c.carbonClassId.toLowerCase();

    // Get hardcoded carbon class info
    const carbonClassInfo = isCarbonClassId(carbonClassId)
      ? CARBON_CLASSES_INFO_MAP[carbonClassId]
      : null;

    return {
      name: carbonClassInfo?.name ?? c.id,
      category: carbonClassInfo?.category ?? 'Other',
      valueUSD,
      valueUSDChangePercent24h,
      supplyTonnes,
    };
  });
};

const getMockCarbonClasses = (): CarbonClass[] => {
  return [
    {
      name: 'Ocean Alkalinity Enhancement (OAE)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
    },
    {
      name: 'Enhanced Rock Weathering (ERW)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
    },
    {
      name: 'Nature Based CDR (NBCDR)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
    },
    {
      name: 'Biochar (CHAR)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 36.97,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
    },
    {
      name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
      category: 'Forestry',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
    },
    {
      name: 'Afforestation, Reforestation, and Revegetation (ARR)',
      category: 'Forestry',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
    },
    {
      name: 'Improved Forest Management (IFM)',
      category: 'Forestry',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.04,
    },
    {
      name: 'Mangroves (MNGRV)',
      category: 'Blue Carbon',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
    },
    {
      name: 'Water Filtration',
      category: 'Blue Carbon',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
    },
    {
      name: 'RNWBL',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.03,
    },
    {
      name: 'Cookstoves',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
    },
    {
      name: 'Landfill Gas',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.1,
    },
  ];
};
