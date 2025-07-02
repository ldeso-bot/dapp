import React from 'react';
import { useAccount } from 'wagmi';
import Card from '../Card/Card';
import ConnectButton from '../NavBar/ConnectButton';

export default function ConnectedFeature({
  children,
}: React.PropsWithChildren) {
  const account = useAccount();

  return account.isConnected ? (
    children
  ) : (
    <Card
      title="Connect your wallet to use this feature"
      className="w-full"
      titleAddOnFar={<ConnectButton />}
    />
  );
}
