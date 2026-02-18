'use client';

import contracts, {
  ZKME_COOPERATOR_ADDRESS,
} from '@/shared/constants/contracts.constants';
import ZKMEVerifyUpgradeable from '@/shared/utils/abis/ZKMEVerifyUpgradeable';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { base } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';
import { kycDialogAtom, kycRefetchAtom, KycSource } from './kyc.utils';

const ZKME_VERIFY_ADDRESS_BASE = contracts.ZKMEVerifyUpgradeable[base.id];

export function useHasKycVerification(): {
  isVerified: boolean;
  openKycOrProceed: (source: KycSource, onProceed: () => void) => void;
} {
  const { address } = useAccount();
  const setKycRefetch = useSetAtom(kycRefetchAtom);

  const { data: hasApproved, refetch } = useReadContract({
    address: ZKME_VERIFY_ADDRESS_BASE,
    abi: ZKMEVerifyUpgradeable,
    functionName: 'hasApproved',
    args: address ? [ZKME_COOPERATOR_ADDRESS, address] : undefined,
    chainId: base.id,
    query: { enabled: !!address },
  });

  useEffect(() => {
    setKycRefetch(() => refetch);
    return () => setKycRefetch(null);
  }, [refetch, setKycRefetch]);

  const isVerified = hasApproved === true;
  const setKycDialog = useSetAtom(kycDialogAtom);

  const openKycOrProceed = useCallback(
    (source: KycSource, onProceed: () => void) => {
      if (!isVerified) {
        setKycDialog({ open: true, source });
        return;
      }
      onProceed();
    },
    [isVerified, setKycDialog]
  );

  return { isVerified, openKycOrProceed };
}
