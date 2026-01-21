'use client';

import { createContext, ReactNode } from 'react';

type WalletConnectionHistoryContextValue = {
  hasPreviouslyConnected: boolean;
};

export const WalletConnectionHistoryContext = createContext<
  WalletConnectionHistoryContextValue | undefined
>(undefined);

type Props = {
  hasPreviouslyConnected: boolean;
  children: ReactNode;
};

/**
 * Provider for wallet connection history from SSR
 * Prevents onboarding screen flashes by sharing connection state without prop drilling
 */
export const WalletConnectionHistoryProvider = ({
  hasPreviouslyConnected,
  children,
}: Props) => (
  <WalletConnectionHistoryContext.Provider value={{ hasPreviouslyConnected }}>
    {children}
  </WalletConnectionHistoryContext.Provider>
);

