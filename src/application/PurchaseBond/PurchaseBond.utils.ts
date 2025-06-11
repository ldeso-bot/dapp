import { usePermit } from '@/shared/hooks/usePermit';
import { useCallback } from 'react';

export const useTransferWithPermit = () => {
  const permit = usePermit({
    spenderName: 'USDCTransferWithPermit',
    tokenName: 'USDC',
    value: 1000000000000000000n,
  });

  const send = useCallback(async () => {
    const signature = await permit.getPermitSignature();
    if (!signature) {
      console.error('Signature is not ready');
      return null;
    }

    const { r, s, v } = signature;

    console.log(r, s, v);
  }, [permit]);

  return {
    send,
  };
};
