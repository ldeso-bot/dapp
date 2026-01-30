import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ONE_YEAR } from '../constants/protocol.constants';
import { WALLET_CONNECTION_HISTORY_COOKIE } from '../constants/storage.constants';
import { deleteCookie, setCookie } from '../utils/cookie.utils';

export const useWalletConnectionCookie = (address: string | undefined) => {
  const router = useRouter();

  useEffect(() => {
    if (!address) return;
    setCookie(WALLET_CONNECTION_HISTORY_COOKIE, '1', {
      maxAge: ONE_YEAR,
    });
  }, [address]);

  // Clear cookie and refresh on logout
  const clearWalletCookie = () => {
    deleteCookie(WALLET_CONNECTION_HISTORY_COOKIE);
    router.refresh(); // Refresh to re-read cookie from server
  };

  return { clearWalletCookie };
};
