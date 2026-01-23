import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { CreditBalance } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { CreditBalance_Filter } from '@generated/gql/types/carbon.types';
import { filter, isNonNullish } from 'remeda';
import { getCarbonClasses } from '../protocol/getCarbonClasses';
import { mockTokenIds, mockTokens } from '../protocol/mocks';
import { mapToApiCreditToken } from '../protocol/protocol.utils';

export const getCreditBalances = async (
  chainId: ChainId,
  walletAddress: string
): Promise<CreditBalance[]> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockCreditBalances();
  }

  // Fetch balances from the subgraph and gather carbon classes information
  const [creditBalances, carbonClasses] = await Promise.all([
    sdk.carbon.getCreditBalances({
      where: {
        account: walletAddress.toLowerCase(),
      } as CreditBalance_Filter,
    }),
    getCarbonClasses(chainId),
  ]);

  const balances = creditBalances.creditBalances.map(
    (balance): CreditBalance | null => {
      const creditToken = mapToApiCreditToken(
        sdk,
        balance.credit.creditTokenId,
        balance.credit
      );
      if (!creditToken) {
        return null;
      }
      return {
        balance: formatStringToNumber(balance.balance, 18),
        creditToken,
        registeredClasses: carbonClasses.filter((c) =>
          c.registeredTokens.some(
            (t) => t.creditTokenId === balance.credit.creditTokenId
          )
        ),
      };
    }
  );

  // Return only balances from registered tokens
  return filter(
    filter(balances, isNonNullish),
    (b) => b.registeredClasses.length > 0
  );
};

const getMockCreditBalances = (): CreditBalance[] => {
  return [
    {
      balance: 1000,
      creditToken: mockTokens[0],
      registeredClasses: [
        {
          name: 'Carbon Class 1',
          category: 'Carbon Dioxide Removals',
          valueUSD: 1000,
          supplyTonnes: 1000,
          valueUSDChangePercent24h: 0.01,
          carbonClassId: '0x1234567890123456789012345678901234567890',
          registeredTokens: mockTokenIds.map((id) => ({
            creditTokenId: id,
            amount: 0,
          })),
        },
      ],
    },
  ];
};
