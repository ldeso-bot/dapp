import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import {
  exitWithErrorMessage,
  handleWeb3Error,
} from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { isAddress, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

type SellCarbonParams = {
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

export const useSellCarbon = (params: SellCarbonParams) => {
  const { contract } = useContract('AAMDiamond');

  const { chain } = useAccount();

  const { executeWithValidation, isExecuting } =
    useTransactionAndWaitForWalletUpdate({
      valueFetcher: (walletData: WalletData) =>
        walletData?.creditBalances.find(
          (balance) =>
            balance.creditToken.address === params.credit &&
            balance.creditToken.tokenId === params.tokenId
        )?.balance ?? 0,
    });

  const sellCarbon =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      try {
        if (!contract) {
          return exitWithErrorMessage('Contract is not ready');
        }

        if (!chain) {
          return exitWithErrorMessage('Chain is not ready');
        }

        // Validate amount
        if (params.amount <= 0n) {
          return exitWithErrorMessage('Amount must be greater than 0');
        }

        // Validate addresses
        if (!isAddress(params.carbonClass)) {
          return exitWithErrorMessage('Invalid carbon class address');
        }

        if (!isAddress(params.credit)) {
          return exitWithErrorMessage('Invalid credit address');
        }

        if (!isAddress(params.recipient)) {
          return exitWithErrorMessage('Invalid recipient address');
        }

        // Prepare coupon burn params
        const couponBurnParams = params.couponBurnParams ?? {
          tonnes: 0n,
          from: zeroAddress,
        };

        if (!isAddress(couponBurnParams.from)) {
          return exitWithErrorMessage(
            'Invalid coupon burn params from address'
          );
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
        const transaction = () =>
          contract.write.swapCarbonCreditForKvcm([swapParams], {
            chain,
          });

        return executeWithValidation(transaction);
      } catch (error) {
        console.error('Error selling carbon:', error);
        return {
          ...handleWeb3Error(error),
          hash: null,
        };
      }
    }, [contract, chain, executeWithValidation, params]);

  return { sellCarbon, isExecuting };
};
