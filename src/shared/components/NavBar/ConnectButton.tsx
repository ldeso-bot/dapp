'use client';

import logoutIcon from '@/shared/images/logout.svg';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

type Props = {
  className?: string;
};

export default function ConnectButton({ className }: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <Button onClick={() => disconnect()} className={className}>
        <Icon icon={logoutIcon} alt={'Logout'} size={1.6} />
        Logout
      </Button>
    );
  }

  return (
    <RainbowConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return null;
        return (
          <Button onClick={openConnectModal} className={className}>
            Connect wallet
          </Button>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
