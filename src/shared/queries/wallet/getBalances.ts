import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { tokenInfoFromSubgraphSymbol } from '@/shared/constants/tokens.constants';
import { Balances } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { getContract, getPublicClient } from '@/shared/utils/web3.utils';
import { AccountBalance_Filter } from '@generated/gql/types/protocol.types';

export const getBalances = async (
  chainId: ChainId,
  walletAddress: string
): Promise<Balances> => {
  const sdk = getSdk(chainId);
  const publicClient = getPublicClient(chainId);
  if (USE_MOCKS) {
    return getMockBalances();
  }

  // Prepare result
  const res = {
    usdc: 0,
    kvcm: 0,
    k2: 0,
    'kvcm-usdc': 0,
    'kvcm-k2': 0,
  };

  // Fetch USDC balance via RPC
  const usdcContract = getContract(chainId, 'USDC', publicClient);
  try {
    const usdcBalance = (await usdcContract.read.balanceOf([
      walletAddress,
    ])) as bigint;
    res.usdc = formatStringToNumber(usdcBalance, 6); // USDC has 6 decimals
  } catch (error) {
    console.error('❌ Error fetching USDC balance via RPC:', error);
  }

  // Fetch other balances from subgraph
  const balances = await sdk.protocol.getAccountBalances({
    where: {
      account_: {
        id: walletAddress.toLowerCase(),
      },
    } as AccountBalance_Filter,
  });

  // Update values
  balances.accountBalances.forEach((balance) => {
    const tokenInfo = tokenInfoFromSubgraphSymbol(balance.token.symbol);
    if (!tokenInfo) {
      console.warn('❓ Unknown balance token:', balance.token.symbol);
      return null;
    }
    res[tokenInfo.id] = Number(balance.amount);
  });

  return res;
};

const getMockBalances = (): Balances => {
  return {
    usdc: 1000,
    kvcm: 1000,
    k2: 1000,
    'kvcm-usdc': 1000,
    'kvcm-k2': 1000,
  };
};
