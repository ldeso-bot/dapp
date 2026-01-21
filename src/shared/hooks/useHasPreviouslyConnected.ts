import { useContext } from 'react';
import { WalletConnectionHistoryContext } from '../contexts/WalletCookieContext';

/**
 * Hook to check if user has previously connected a wallet
 * Used to prevent showing onboarding screens during wallet hydration
 */
export const useHasPreviouslyConnected = () => {
  const context = useContext(WalletConnectionHistoryContext);
  if (context === undefined) {
    throw new Error(
      'useHasPreviouslyConnected must be used within a WalletConnectionHistoryProvider'
    );
  }
  return context;
}

