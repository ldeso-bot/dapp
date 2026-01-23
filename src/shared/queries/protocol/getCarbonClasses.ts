import { getCarbonClassInfo } from '@/shared/constants/carbonClasses.constants';
import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { CarbonClass } from '@/shared/models/shared';
import { formatAddress } from '@/shared/utils/string.utils';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import {
  CarbonClass_Filter,
  TokenSnapshot_Filter,
} from '@generated/gql/types/protocol.types';
import { filter, isNonNullish, mapToObj } from 'remeda';
import { mockTokenIds } from './mocks';
import {
  getCreditsTokenMap,
  getHoursSinceEpoch24HoursAgo,
  mapToApiCreditToken,
} from './protocol.utils';

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

  const [tokensMap, ...tokenSnapshotsResponses] = await Promise.all([
    getCreditsTokenMap(sdk),
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

  const tokenSnapshotsMap = mapToObj(tokenSnapshotsResponses, (t) => [
    t?.tokenAddress ?? '',
    t,
  ]);

  //Compute carbon classes
  return carbonClasses?.map((c) => {
    // Add up the supply tonnes of all registered tokens
    const supplyTonnes = c.registeredCredits.reduce(
      (acc, r) => acc + (tokensMap[r.creditTokenId]?.totalSupplyTonnes ?? 0),
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
    const carbonClassInfo = getCarbonClassInfo(chainId, carbonClassId);

    const registeredTokens = filter(
      c.registeredCredits.map((r) => {
        const credit = mapToApiCreditToken(
          sdk,
          r.creditTokenId,
          tokensMap[r.creditTokenId]
        );
        if (!credit) {
          console.warn(
            '❓ Credit information not found for: ',
            r.creditTokenId
          );
          return null;
        }
        // Find the corresponding liquidity amount for this credit token
        const liquidity = c.liquidities?.find(
          (l) => l.credit.creditTokenId === r.creditTokenId
        );
        return {
          creditTokenId: r.creditTokenId,
          amount: formatStringToNumber(liquidity?.amount, credit.decimals),
        };
      }),
      isNonNullish
    );

    return {
      carbonClassId,
      name: carbonClassInfo?.name ?? formatAddress(c.carbonClassId),
      category: carbonClassInfo?.category ?? 'Other',
      valueUSD,
      valueUSDChangePercent24h,
      supplyTonnes,
      registeredTokens,
    } satisfies CarbonClass;
  });
};

const getMockCarbonClasses = (): CarbonClass[] => {
  return [
    {
      carbonClassId: '0x1234567890123456789012345678901234567890',
      name: 'Ocean Alkalinity Enhancement (OAE)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567891',
      name: 'Enhanced Rock Weathering (ERW)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567892',
      name: 'Nature Based CDR (NBCDR)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567893',
      name: 'Biochar (CHAR)',
      category: 'Carbon Dioxide Removals',
      valueUSD: 36.97,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567894',
      name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
      category: 'Forestry',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567895',
      name: 'Afforestation, Reforestation, and Revegetation (ARR)',
      category: 'Forestry',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567896',
      name: 'Improved Forest Management (IFM)',
      category: 'Forestry',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.04,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567897',
      name: 'Mangroves (MNGRV)',
      category: 'Blue Carbon',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567898',
      name: 'Water Filtration',
      category: 'Blue Carbon',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567899',
      name: 'RNWBL',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 12.04,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.03,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567900',
      name: 'Cookstoves',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 3.99,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: -0.01,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
    {
      carbonClassId: '0x1234567890123456789012345678901234567901',
      name: 'Landfill Gas',
      category: 'Carbon Dioxide Avoidance',
      valueUSD: 1.02,
      supplyTonnes: 1000,
      valueUSDChangePercent24h: 0.1,
      registeredTokens: mockTokenIds.map((id) => ({
        creditTokenId: id,
        amount: 0,
      })),
    },
  ];
};
