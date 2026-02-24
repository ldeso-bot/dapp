'use client';

import { ConnectModalDisclaimer } from '@/shared/components/RainbowKit/ConnectModalDisclaimer';
import { UnsupportedNetworkModal } from '@/shared/components/RainbowKit/UnsupportedNetworkModal';
import {
  FORMO_DEBUG,
  FORMO_WRITE_KEY,
} from '@/shared/constants/config.constants';
import { DOCS_URL } from '@/shared/constants/urls.constants';
import { createWagmiConfig } from '@/shared/utils/wagmi.utils';
import { queryClient } from '@/shared/utils/web3.utils';
import { FormoAnalyticsProvider } from '@formo/analytics';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo, useState } from 'react';
import { State, WagmiProvider } from 'wagmi';

type ProvidersProps = {
  children: ReactNode;
  initialState?: State;
};

export function Providers({ children, initialState }: ProvidersProps) {
  const [client] = useState(() => queryClient);

  const wagmiConfig = useMemo(() => {
    return createWagmiConfig();
  }, []);

  return (
    <WagmiProvider
      reconnectOnMount
      config={wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={client}>
        <FormoAnalyticsProvider
          writeKey={FORMO_WRITE_KEY}
          options={{
            tracking: FORMO_DEBUG ? true : undefined,
            flushInterval: FORMO_DEBUG ? 5000 : undefined,
            logger: FORMO_DEBUG
              ? {
                  enabled: true,
                  levels: ['error', 'warn', 'info'],
                }
              : undefined,
            autocapture: true,
          }}
        >
          <RainbowKitProvider
            modalSize="compact"
            appInfo={{
              appName: 'Klima v2',
              learnMoreUrl: `${DOCS_URL}`,
              disclaimer: ConnectModalDisclaimer,
            }}
          >
            <UnsupportedNetworkModal />
            {children}
          </RainbowKitProvider>
        </FormoAnalyticsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
