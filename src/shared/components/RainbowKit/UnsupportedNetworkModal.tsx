'use client';

import Button from '@/shared/components/Button/Button';
import Dialog from '@/shared/components/Dialog/Dialog';
import { chains } from '@/shared/constants/networks.constants';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain } from 'wagmi';

export const UnsupportedNetworkModal = () => {
  const { chain, isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { switchChain } = useSwitchChain();

  const isUnsupportedNetwork =
    isConnected &&
    chain &&
    !chains.some((supportedChain) => supportedChain.id === chain.id);

  if (!isUnsupportedNetwork) {
    return null;
  }

  const handleSwitchChain = () => {
    if (openChainModal) {
      openChainModal();
    } else {
      switchChain({ chainId: chains[0].id });
    }
  };

  return (
    <Dialog open={isUnsupportedNetwork} closeOnOutsideClick>
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Unsupported Network [t391]</h2>
        <p className="mb-6 text-text-1">
          You’re connected to {chain?.name || 'an unsupported network'}. Please
          switch to Base Mainnet to continue. [t392]
        </p>
        <div className="flex gap-3">
          <Button onClick={handleSwitchChain} className="flex-1">
            Switch Network [t393]
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
