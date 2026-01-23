'use client';

import { chains } from '@/shared/constants/networks.constants';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseAccount,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from 'wagmi';
import {
  USE_LOCAL_RPC,
  WALLETCONNECT_PROJECT_ID,
} from '../constants/config.constants';

export const createWagmiConfig = () => {
  if (!WALLETCONNECT_PROJECT_ID) {
    console.warn('WALLETCONNECT_PROJECT_ID is not set.');
  }

  const wallets = [
    {
      groupName: 'Recommended',
      wallets: [baseAccount],
    },
    {
      groupName: 'Other wallets',

      wallets: [
        // only create connectors on client-side to avoid SSR issues
        // see https://github.com/rainbow-me/rainbowkit/issues/2476
        ...(typeof indexedDB !== 'undefined'
          ? [
              metaMaskWallet,
              // Only include WalletConnect if projectId is set
              ...(WALLETCONNECT_PROJECT_ID ? [walletConnectWallet] : []),
            ]
          : []),
        injectedWallet,
      ],
    },
  ];

  if (USE_LOCAL_RPC) {
    console.warn('🚧 Using local RPC');
  }

  return getDefaultConfig({
    chains,
    wallets,
    ssr: true,
    appName: 'Klima v2 dApp',
    projectId: WALLETCONNECT_PROJECT_ID,
    transports: Object.fromEntries(
      chains.map((chain) => [
        chain.id,
        http(
          USE_LOCAL_RPC
            ? 'http://localhost:8545'
            : chain.rpcUrls.default.http[0]
        ),
      ])
    ) as Record<(typeof chains)[number]['id'], ReturnType<typeof http>>,
  });
};
