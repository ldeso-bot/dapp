import ERC20 from '@/shared/utils/abis/ERC20';
import { useCallback, useState } from 'react';
import { isNullish } from 'remeda';
import { Address, isAddress, maxUint256 } from 'viem';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWalletClient,
} from 'wagmi';
import { TokenStandard } from '../models/shared';

type ApprovedAmountOptions = {
  tokenAddress: string;
  tokenId?: string;
  tokenStandard: TokenStandard;
  spender: string;
  amount: bigint;
};

/**
 * Get the allowance of a token for a spender
 * Handle setting allowance for a token
 * @param options
 * @returns
 */
export const useAllowance = ({
  tokenAddress,
  spender,
  amount,
}: ApprovedAmountOptions) => {
  const { address: owner } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [isSettingAllowance, setIsSettingAllowance] = useState<boolean>(false);

  const address: Address | undefined = isAddress(tokenAddress)
    ? tokenAddress
    : undefined;

  // TODO: support ERC1155 tokens
  const query = useReadContract({
    address,
    abi: ERC20,
    functionName: 'allowance',
    args: [owner as Address, spender as Address],
    query: {
      staleTime: 0,
    },
  });

  const allowance = BigInt(String(query.data ?? 0));

  const isAllowed = allowance >= amount;

  /**
   * Set the allowance for a token
   * @param amount - The amount to set the allowance to. If not provided, will set infinite allowance
   * @returns True if the allowance was set successfully, false otherwise
   * @throws Error if the address is invalid, the wallet client is not found, the public client is not found, or the allowance is not set
   */
  const setAllowance = useCallback(
    async (amount?: bigint) => {
      if (!address) {
        console.error('Address is invalid');
        return;
      }
      if (!walletClient) {
        console.error('Wallet client not found');
        return;
      }
      if (!publicClient) {
        console.error('Wallet client not found');
        return;
      }
      if (isNullish(amount)) {
        amount = maxUint256;
      }

      try {
        setIsSettingAllowance(true);
        const hash = await walletClient.writeContract({
          chain: walletClient.chain,
          address,
          abi: ERC20,
          functionName: 'approve',
          args: [spender as Address, amount],
        });
        await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 2,
        });
        query.refetch({});
        return true;
      } catch (error) {
        console.error('Error setting allowance', error);
        return false;
      } finally {
        setIsSettingAllowance(false);
      }
    },
    [walletClient, address, spender, query, publicClient]
  );

  return { allowance, setAllowance, isAllowed, isSettingAllowance };
};
