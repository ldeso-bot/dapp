'use client';

import { useWalletConnectionCookie } from '@/shared/hooks/useWalletConnectionCookie';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../Button/Button';
import ThemeToggle from '../NavBar/ThemeToggle';

type Props = {
  className?: string;
};

export default function ConnectButton({}: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { clearWalletCookie } = useWalletConnectionCookie(address);

  const handleLogout = () => {
    disconnect();
    clearWalletCookie();
  };

  if (address) {
    return (
      <div className="flex gap-2 items-center">
        <Button
          onClick={handleLogout}
          className="flex-1 h-10 border-border-strong"
        >
          <span className="flex gap-1 text-text-1">Logout [t377]</span>
        </Button>

        <ThemeToggle />
      </div>
    );
  }

  return (
    <RainbowConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return null;

        return (
          <div className="flex gap-2 items-center">
            <Button
              onClick={openConnectModal}
              className="flex-1 h-10 border-border-strong"
            >
              Connect wallet [t378]
            </Button>

            <ThemeToggle />
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
