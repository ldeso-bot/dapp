'use client';

import logoutIcon from '@/shared/images/logout.svg';
import { ConnectKitButton, useIsMounted } from 'connectkit';
import Image from 'next/image';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';

export default function ConnectButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();

  return (
    <>
      {address ? (
        <>
          <Button onClick={() => disconnect()} className="w-full">
            <Image src={logoutIcon} alt={'Logout'} width={16} height={16} />
            Logout
          </Button>
        </>
      ) : (
        <>
          {isMounted && (
            <ConnectKitButton.Custom>
              {({ isConnecting, show }) => {
                return (
                  <Button onClick={show} className="w-full">
                    {isConnecting ? 'Connecting...' : 'Connect wallet'}
                  </Button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
          {!isMounted && <Skeleton className="h-10 w-full" />}
        </>
      )}
    </>
  );
}
