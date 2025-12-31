import { useCallback } from 'react';
import { usePublicClient } from 'wagmi';

export const useWaitForTransaction = (confirmations: number = 2) => {
  const publicClient = usePublicClient();
  const waitForTransaction = useCallback(
    async (hash: `0x${string}`) => {
      if (!publicClient) {
        throw new Error('Public client not available');
      }
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations,
      });
      if (receipt.status === 'reverted') {
        throw new Error('Transaction reverted');
      }
      return receipt;
    },
    [publicClient, confirmations]
  );
  return { waitForTransaction };
};
