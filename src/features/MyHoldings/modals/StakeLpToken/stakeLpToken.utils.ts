import { useTransactionWithValidation } from '@/features/MyHoldings/hooks/useTransactionWithValidation';
import {
  AERODROME_K2_USDC_POOL_INDEX,
  AERODROME_KVCM_USDC_POOL_INDEX,
} from '@/shared/constants/contracts.constants';
import { LpToken } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { getAerodromePoolByIndex } from '@/shared/utils/aerodrome.utils';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useQueryClient } from '@tanstack/react-query';
import { atom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

export type StakeLpTokenFields = {
  token: string;
  amount: number;
  duration: number;
  maturityId?: number;
  maturityDate?: number;
};

export const stakeLpTokenDialogAtom = atom({
  open: false,
  token: null as LpToken | null,
});

export const useStakeLpToken = (params: {
  token: LpToken;
  amount: bigint;
  maturityId: number;
  lpTokenAddress?: Address;
}) => {
  const queryClient = useQueryClient();
  const { token, amount, maturityId, lpTokenAddress } = params;
  const { data: protocolData } = useProtocolData();
  const { address: userAddress, chain } = useAccount();

  const queryKey = [`wallet-data-${userAddress}`];
  const { contract: stakingContract } = useContract('StakingManagerDiamond');

  const [fetchedLpAddress, setFetchedLpAddress] = useState<Address | null>(
    null
  );
  const [isPairRegistered, setIsPairRegistered] = useState<boolean | null>(
    null
  );

  const lpAddress = useMemo(() => {
    if (lpTokenAddress) return lpTokenAddress;
    const metrics = protocolData?.metrics;
    if (metrics) {
      const tokenMetrics =
        token === 'kvcm-usdc' ? metrics['kvcm-usdc'] : metrics['kvcm-k2'];
      return (tokenMetrics?.address as Address) || null;
    }
    return null;
  }, [lpTokenAddress, protocolData, token]);

  useEffect(() => {
    const fetchLpAddress = async () => {
      if (lpAddress || !chain) return;
      try {
        const poolIndex =
          token === 'kvcm-usdc'
            ? AERODROME_KVCM_USDC_POOL_INDEX
            : AERODROME_K2_USDC_POOL_INDEX;
        const pool = await getAerodromePoolByIndex(poolIndex);
        if (pool?.lp) {
          setFetchedLpAddress(pool.lp as Address);
        }
      } catch (error) {
        console.error('Failed to fetch LP token address:', error);
      }
    };
    fetchLpAddress();
  }, [lpAddress, chain, token]);

  const finalLpAddress = lpAddress || fetchedLpAddress;

  useEffect(() => {
    const checkPairRegistration = async () => {
      if (!finalLpAddress || !stakingContract || !chain) return;
      try {
        const pairInfo = (await stakingContract.read.getLPStakingPairInfo([
          finalLpAddress,
        ])) as readonly [Address, Address, Address, boolean];
        setIsPairRegistered(pairInfo?.[3]);
      } catch (error) {
        console.error('Failed to check pair registration:', error);
        setIsPairRegistered(false);
      }
    };
    checkPairRegistration();
  }, [finalLpAddress, stakingContract, chain]);

  const { isAllowed, setAllowance } = useAllowance({
    tokenAddress: finalLpAddress || '',
    tokenStandard: 'ERC20',
    spender: stakingContract?.address || '',
    amount,
  });

  const { executeWithValidation } = useTransactionWithValidation<WalletData>({
    queryKey,
    validate: (walletData, previousData) => {
      if (!walletData?.locks) return false;
      const currentLockCount = previousData?.locks.length ?? 0;
      if (walletData.locks.length > currentLockCount) {
        return true;
      }
      // For topups: check if the existing lock amount for this maturity changed
      const existingLock = walletData.locks.find(
        (lock) => lock.maturityId === maturityId && lock.token === token
      );
      const previousLock = previousData?.locks.find(
        (lock) => lock.maturityId === maturityId && lock.token === token
      );
      // If the lock exists and the amount is different, the data is updated
      if (
        existingLock &&
        previousLock &&
        existingLock.lockedAmount !== previousLock.lockedAmount
      ) {
        return true;
      }
      return false;
    },
  });

  const stake = useCallback(async () => {
    try {
      if (!stakingContract || !chain) {
        throw new Error('Contract or chain not ready');
      }
      if (!finalLpAddress) {
        throw new Error('LP token address not available');
      }
      if (isPairRegistered === false) {
        throw new Error(
          `LP token ${finalLpAddress} is not registered or active with the staking contract. Please verify the LP token address is correct.`
        );
      }
      if (maturityId < 1) {
        throw new Error(
          `Invalid maturity ID: ${maturityId}. Maturity ID must be at least 1.`
        );
      }
      if (!isAllowed) {
        const approved = await setAllowance();
        if (!approved) {
          throw new Error('Failed to approve LP token');
        }
      }
      const executeTransaction = () =>
        stakingContract.write.stakeLP([finalLpAddress, maturityId, amount], {
          chain,
        });
      return await executeWithValidation(executeTransaction);
    } catch (error) {
      console.error('❌ Stake LP error:', error);
      return handleWeb3Error(error);
    }
  }, [
    stakingContract,
    chain,
    finalLpAddress,
    maturityId,
    amount,
    isAllowed,
    setAllowance,
    executeWithValidation,
    isPairRegistered,
  ]);

  return {
    stake,
    contract: stakingContract,
    lpAddress: finalLpAddress,
  };
};
