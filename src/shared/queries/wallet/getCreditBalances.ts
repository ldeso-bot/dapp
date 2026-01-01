import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { CreditBalance } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { CreditBalance_Filter } from '@generated/gql/types/carbon.types';
import { filter } from 'remeda';
import { getCarbonClasses } from '../protocol/getCarbonClasses';
import { mockRegisteredTokens } from '../protocol/mocks';

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
    (balance): CreditBalance => {
      return {
        balance: formatStringToNumber(balance.balance, 18),
        creditTokenId: balance.credit.creditTokenId,
        name:
          balance.credit.project?.metadata?.name ??
          balance.credit.creditTokenId,
        registeredClasses: carbonClasses.filter((c) =>
          c.registeredTokens.some(
            (t) => t.creditTokenId === balance.credit.creditTokenId
          )
        ),
      };
    }
  );

  // Return only balances from registered tokens
  return filter(balances, (b) => b.registeredClasses.length > 0);
};

const getMockCreditBalances = (): CreditBalance[] => {
  return [
    {
      balance: 1000,
      creditTokenId: '0x1234567890123456789012345678901234567890',
      name: 'Credit Token 1',
      registeredClasses: [
        {
          name: 'Carbon Class 1',
          category: 'Carbon Dioxide Removals',
          valueUSD: 1000,
          supplyTonnes: 1000,
          valueUSDChangePercent24h: 0.01,
          carbonClassId: '0x1234567890123456789012345678901234567890',
          registeredTokens: mockRegisteredTokens,
        },
      ],
    },
  ];
};
