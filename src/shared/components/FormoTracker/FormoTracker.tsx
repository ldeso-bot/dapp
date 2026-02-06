'use client';
import { useFormo } from '@formo/analytics';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const FormoTracker = () => {
  const { address } = useAccount();
  const analytics = useFormo();

  useEffect(() => {
    if (address && analytics) {
      analytics.identify({ address });
    }
  }, [address, analytics]);

  return <></>;
};
