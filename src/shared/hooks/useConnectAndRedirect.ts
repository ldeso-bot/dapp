import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

/**
 * Hook that handles wallet connection and redirects to a specified path
 * after the user connects their wallet. If already connected, redirects immediately.
 */
export const useConnectAndRedirect = (redirectPath: string) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const pendingRedirectRef = useRef(false);
  const previouslyConnectedRef = useRef(isConnected);

  // Redirect after connecting if we have a pending redirect
  useEffect(() => {
    if (
      isConnected &&
      !previouslyConnectedRef.current &&
      pendingRedirectRef.current
    ) {
      router.push(redirectPath);
      pendingRedirectRef.current = false;
    }
    previouslyConnectedRef.current = isConnected;
  }, [isConnected, router, redirectPath]);

  const handleButtonClick = () => {
    if (!isConnected) {
      pendingRedirectRef.current = true;
      openConnectModal?.();
    } else {
      router.push(redirectPath);
    }
  };

  return handleButtonClick;
};
