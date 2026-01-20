import { useTransactionWithValidation } from '@/features/MyHoldings/hooks/useTransactionWithValidation';
import { Token } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

type RetireCarbonParams = {
  creditTokenAddress: string;
  creditTokenId: number;
  amount: bigint;
  carbonClassId: string;
  inputTokenAddress: string;
  inputTokenIdentifier: Token;
  maxInputTokenIn: bigint;
};

export const useRetireCarbon = (params: RetireCarbonParams) => {
  const { contract } = useContract('RetirementAggregator');
  const { chain, address: walletAddress } = useAccount();

  const queryClient = useQueryClient();
  const queryKey = [`wallet-data-${walletAddress}`];

  const { executeWithValidation, isExecuting } =
    useTransactionWithValidation<WalletData>({
      queryKey,
      validate: (walletData, previousData) => {
        // Validate that the transaction affected the wallet data
        if (!walletData?.balances) return false;
        // Check if payment token balance changed (payment token spent)
        const currentBalance =
          walletData?.balances?.[params.inputTokenIdentifier];
        const previousBalance =
          previousData?.balances?.[params.inputTokenIdentifier];
        if (
          currentBalance !== undefined &&
          previousBalance !== undefined &&
          currentBalance !== previousBalance
        ) {
          return true;
        }
        return false;
      },
      getPreviousData: () => queryClient.getQueryData<WalletData>(queryKey),
    });

  const retireCarbon = useCallback(async () => {
    try {
      const exitWithErrorMessage = (message: string) => {
        console.error(message);
        return { error: message };
      };

      if (!contract) {
        return exitWithErrorMessage('Contract is not ready');
      }

      if (!chain) {
        return exitWithErrorMessage('Chain is not ready');
      }

      if (!walletAddress) {
        return exitWithErrorMessage('Wallet address is not ready');
      }

      // Validate amount
      if (params.amount <= 0n) {
        return exitWithErrorMessage('Amount must be greater than 0');
      }

      // Validate addresses
      if (!isAddress(params.creditTokenAddress)) {
        return exitWithErrorMessage('Invalid credit token address');
      }

      if (!isAddress(params.carbonClassId)) {
        return exitWithErrorMessage('Invalid carbon class address');
      }

      if (!isAddress(params.inputTokenAddress)) {
        return exitWithErrorMessage('Invalid input token address');
      }

      const details = [
        walletAddress, // retiringAddress
        '', // retiringEntityString
        walletAddress, // beneficiaryAddress
        '', // beneficiaryString
        '', // retirementMessage
        '', // beneficiaryLocation
        '', // consumptionCountryCode
        BigInt(0), // consumptionPeriodStart
        BigInt(0), // consumptionPeriodEnd
      ] as const;

      // Prepare retire params
      const retireParams = [
        params.creditTokenAddress as `0x${string}`, // creditToken
        BigInt(params.creditTokenId), // tokenId
        BigInt(0), // batchId
        params.amount, // amount
        params.inputTokenAddress as `0x${string}`, // inputTokenAddress
        params.carbonClassId as `0x${string}`, // carbonClass
        params.maxInputTokenIn, // maxInputTokenIn
        BigInt(0), // couponTonnes
        details, // details
      ] as const;

      // Call the contract
      const transaction = () =>
        contract.write.retireCreditViaKlima(retireParams, {
          chain,
        });

      return await executeWithValidation(transaction);
    } catch (error) {
      console.error('Error retiring carbon:', error);
      return handleWeb3Error(error);
    }
  }, [contract, chain, executeWithValidation, params, walletAddress]);

  return { retireCarbon, isExecuting };
};
