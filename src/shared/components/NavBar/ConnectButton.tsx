'use client';

import logoutIcon from '@/shared/images/logout.svg';
import { ConnectKitButton } from 'connectkit';
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
    <ConnectKitButton.Custom>
      {({ isConnecting, show }) => {
        return (
          <Button onClick={show} className={className}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
