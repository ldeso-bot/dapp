'use client';
import { LO } from '@/shared/utils/userTracking.utils';
import { useFormo } from '@formo/analytics';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const UserTracker = () => {
  const { address } = useAccount();
  const analytics = useFormo();

  // Formo Analytics
  useEffect(() => {
    if (address && analytics) {
      analytics.identify({ address });
    }
  }, [address, analytics]);

  // Lucky Orange
  useEffect(() => {
    if (address) {
      LO.identify(address, { address });
    }
  }, [address]);

  return <></>;
};
