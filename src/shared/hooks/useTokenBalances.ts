import { useHoldingsData } from '@/features/MyHoldings/hooks/useHoldingsData';
import { isLpToken } from '@/shared/constants/tokens.constants';
import { useWalletData } from './api/useWalletData';

type TokenBalance = {
  asset: string;
  balance: string;
  token: string;
  usdValue: number;
  deployedBalance: number;
  deployedUsdValue: number;
  lpToken: boolean;
};

export const useTokenBalances = (): TokenBalance[] => {
  const { data: walletData } = useWalletData();
  const { data: holdingsData } = useHoldingsData();

  const balances = Object.entries(walletData?.balances ?? {}).map(
    ([token, balance]) => {
      let usdValue = 0;
      let deployedBalance = 0;
      let deployedUsdValue = 0;
      if (token === 'kvcm') {
        usdValue = holdingsData?.kvcm.balanceValue ?? 0;
        deployedBalance = holdingsData?.kvcm.lockedAmount ?? 0;
        deployedUsdValue = holdingsData?.kvcm.lockedValue ?? 0;
      } else if (token === 'k2') {
        usdValue = holdingsData?.k2.balanceValue ?? 0;
        deployedBalance = holdingsData?.k2.lockedAmount ?? 0;
        deployedUsdValue = holdingsData?.k2.lockedValue ?? 0;
      } else if (token === 'kvcm-usdc') {
        usdValue = holdingsData?.kvcmUsdc.balanceValue ?? 0;
        deployedBalance = holdingsData?.kvcmUsdc.lockedAmount ?? 0;
        deployedUsdValue = holdingsData?.kvcmUsdc.lockedValue ?? 0;
      } else if (token === 'kvcm-k2') {
        usdValue = holdingsData?.kvcmK2.balanceValue ?? 0;
        deployedBalance = holdingsData?.kvcmK2.lockedAmount ?? 0;
        deployedUsdValue = holdingsData?.kvcmK2.lockedValue ?? 0;
      }

      return {
        asset: token,
        balance: balance.toString(),
        token: token,
        usdValue,
        deployedBalance,
        deployedUsdValue,
        lpToken: isLpToken(token),
      };
    }
  );

  return balances;
};
