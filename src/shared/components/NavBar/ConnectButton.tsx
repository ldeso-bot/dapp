'use client';

import logoutIcon from '@/shared/images/logout.svg';
import { cn } from '@/shared/utils/component.utils';
import { ConnectKitButton, useIsMounted } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../Button/Button';
import ClientOnly from '../ClientOnly/ClientOnly';
import Icon from '../Icon/Icon';
import Skeleton from '../Skeleton/Skeleton';

type Props = {
  className?: string;
};

export default function ConnectButton({ className }: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();

  return (
    <ClientOnly>
      {address ? (
        <>
          <Button onClick={() => disconnect()} className={className}>
            <Icon icon={logoutIcon} alt={'Logout'} size={1.6} />
            Logout
          </Button>
        </>
      ) : (
        <>
          {isMounted && (
            <ConnectKitButton.Custom>
              {({ isConnecting, show }) => {
                return (
                  <Button onClick={show} className={className}>
                    {isConnecting ? 'Connecting...' : 'Connect wallet'}
                  </Button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
          {!isMounted && <Skeleton className={cn('h-10', className)} />}
        </>
      )}
    </ClientOnly>
  );
}
