import { Token } from '@/shared/constants/tokens.constants';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import {
  exitWithErrorMessage,
  handleWeb3Error,
} from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import RetirementAggregatorAbi from '@/shared/utils/abis/RetirementAggregator';

type RetireCarbonParams = {
  creditTokenAddress: string;
  creditTokenId: number;
  batchId: number;
  amount: bigint;
  carbonClassId: string;
  inputTokenAddress: string;
  inputTokenIdentifier: Token;
  maxInputTokenIn: bigint;
  beneficiaryName: string;
  beneficiaryAddress?: string;
  retirementMessage: string;
  consumptionPeriodStart?: number;
  consumptionPeriodEnd?: number;
  countryCode?: string;
};

export const useRetireCarbon = (params: RetireCarbonParams) => {
  const { contract } = useContract<typeof RetirementAggregatorAbi>(
    'RetirementAggregator'
  );
  const { chain, address: walletAddress } = useAccount();

  const { executeWithValidation, isExecuting } =
    useTransactionAndWaitForWalletUpdate({
      valueFetcher: (walletData: WalletData) =>
        walletData?.balances?.[params.inputTokenIdentifier],
    });

  const retireCarbon =
    useCallback(async (): Promise<ExecuteWithValidationResult> => {
      try {
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

        let beneficiaryAddress = walletAddress;

        if (params.beneficiaryAddress) {
          if (!isAddress(params.beneficiaryAddress)) {
            return exitWithErrorMessage('Invalid beneficiary address');
          }
          beneficiaryAddress = params.beneficiaryAddress;
        }

        const details = {
          retiringAddress: walletAddress, // retiringAddress
          retiringEntityString: '', // retiringEntityString
          beneficiaryAddress: beneficiaryAddress, // beneficiaryAddress
          beneficiaryString: params.beneficiaryName, // beneficiaryString
          retirementMessage: params.retirementMessage, // retirementMessage
          beneficiaryLocation: params.countryCode || '', // beneficiaryLocation
          consumptionCountryCode: params.countryCode || '', // consumptionCountryCode
          consumptionPeriodStart: params.consumptionPeriodStart
            ? BigInt(params.consumptionPeriodStart)
            : BigInt(0), // consumptionPeriodStart
          consumptionPeriodEnd: params.consumptionPeriodEnd
            ? BigInt(params.consumptionPeriodEnd)
            : BigInt(0), // consumptionPeriodEnd
        } as const;

        // Prepare retire params
        const retireParams = [
          params.creditTokenAddress, // creditToken
          BigInt(params.creditTokenId), // tokenId
          BigInt(params.batchId), // batchId
          params.amount, // amount
          params.inputTokenAddress, // inputTokenAddress
          params.carbonClassId, // carbonClass
          params.maxInputTokenIn, // maxInputTokenIn
          BigInt(0), // couponTonnes
          details, // details
        ] as const;

        // Call the contract
        const transaction = () =>
          contract.write.retireCreditViaKlima(retireParams, {
            account: walletAddress,
            chain,
          });

        return await executeWithValidation(transaction);
      } catch (error) {
        console.error('Error retiring carbon:', error);
        return {
          ...handleWeb3Error(error),
          hash: null,
        };
      }
    }, [contract, chain, executeWithValidation, params, walletAddress]);

  return { retireCarbon, isExecuting };
};
