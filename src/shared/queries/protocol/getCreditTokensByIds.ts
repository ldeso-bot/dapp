import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { ApiCreditToken } from '@/shared/models/shared';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { CreditToken_Filter } from '@generated/gql/types/carbon.types';
import { isNonNullish } from 'remeda';
import { mockTokens } from './mocks';
import { mapToApiCreditToken } from './protocol.utils';

/**
 * Gets credit tokens by their credit token IDs
 * @param chainId - The chain ID
 * @param creditTokenIds - Array of credit token IDs to fetch
 * @returns Array of ApiCreditToken objects
 */
export const getCreditTokensByIds = async (
  chainId: ChainId,
  creditTokenIds: string[]
): Promise<ApiCreditToken[]> => {
  const sdk = getSdk(chainId);

  if (USE_MOCKS) {
    return mockTokens.filter((token) =>
      creditTokenIds.includes(token.creditTokenId)
    );
  }

  if (creditTokenIds.length === 0) {
    return [];
  }

  // Fetch credit tokens from the subgraph
  const response = await sdk.carbon.getCreditTokens({
    where: {
      creditTokenId_in: creditTokenIds,
    } as CreditToken_Filter,
  });

  const tokens = creditTokenIds
    .map((creditTokenId) => {
      const token = response.creditTokens.find(
        (t) => t.creditTokenId === creditTokenId
      );

      return mapToApiCreditToken(sdk, creditTokenId, token);
    })
    .filter(isNonNullish);
  // Map to ApiCreditToken format and filter out nulls

  return tokens;
};
