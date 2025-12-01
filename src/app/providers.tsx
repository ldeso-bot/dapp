'use client';

import { wagmiConfig } from '@/shared/constants/networks.constants';
import { queryClient } from '@/shared/utils/web3.utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { ReactNode, useState } from 'react';
import { State, WagmiProvider } from 'wagmi';

type ProvidersProps = {
  children: ReactNode;
  initialState?: State;
};

export function Providers({ children, initialState }: ProvidersProps) {
  const [client] = useState(() => queryClient);

  return (
    <WagmiProvider
      reconnectOnMount
      config={wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={client}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
