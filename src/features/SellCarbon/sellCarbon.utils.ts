import { AllocatableToken } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import { useWaitForTransaction } from '@/shared/hooks/web3/useWaitForTransaction';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { isAddress, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

export const sellCarbonDialogAtom = atom({
  open: false,
  token: null as AllocatableToken | null,
});

type SellCarbonParams = {
  address: string; // creditTokenId
  maturityId: number;
  minKvcmOut: bigint;
  recipient: string;
  carbonClass: string; // carbonClassId (address)
  amount: bigint;
  tokenId: number;
  credit: string; // credit token address
  couponBurnParams?: {
    tonnes: bigint;
    from: string;
  };
};

export const useSellCarbon = () => {
  const { contract } = useContract('AAMDiamond');
  const { chain } = useAccount();
  const { waitForTransaction } = useWaitForTransaction();

  const sellCarbon = useCallback(
    async (params: SellCarbonParams): Promise<boolean> => {
      try {
        if (!contract) {
          console.error('Contract is not ready');
          return false;
        }

        if (!chain) {
          console.error('Chain is not ready');
          return false;
        }

        // Validate amount
        if (params.amount <= 0n) {
          console.error('Amount must be greater than 0');
          return false;
        }

        // Validate addresses
        if (!isAddress(params.carbonClass)) {
          console.error('Invalid carbon class address');
          return false;
        }

        if (!isAddress(params.credit)) {
          console.error('Invalid credit address');
          return false;
        }

        if (!isAddress(params.recipient)) {
          console.error('Invalid recipient address');
          return false;
        }

        // Prepare coupon burn params
        const couponBurnParams = params.couponBurnParams ?? {
          tonnes: 0n,
          from: zeroAddress,
        };

        if (!isAddress(couponBurnParams.from)) {
          console.error('Invalid coupon burn params from address');
          return false;
        }

        // Prepare swap params
        const swapParams = {
          carbonClass: params.carbonClass as `0x${string}`,
          credit: params.credit as `0x${string}`,
          tokenId: BigInt(params.tokenId),
          maturityId: BigInt(params.maturityId),
          amount: params.amount,
          minKvcmOut: params.minKvcmOut,
          recipient: params.recipient as `0x${string}`,
          couponBurnParams: [
            couponBurnParams.tonnes,
            couponBurnParams.from as `0x${string}`,
          ] as const,
        };

        // Call the contract
        const txHash = await contract.write.swapCarbonCreditForKvcm(
          [swapParams],
          { chain }
        );

        // Wait for transaction confirmation
        await waitForTransaction(txHash);

        return true;
      } catch (error) {
        console.error('Error selling carbon:', error);
        const errorResult = handleWeb3Error(error);
        console.error('Error details:', errorResult.error);
        return false;
      }
    },
    [contract, chain, waitForTransaction]
  );

  return { sellCarbon };
};
