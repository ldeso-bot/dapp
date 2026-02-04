import { ContractName } from '@/shared/constants/contracts.constants';
import { usePermit } from '@/shared/hooks/web3/usePermit';
import { useCallback } from 'react';

type UsePermitSignatureParams = {
  amount: bigint;
  spenderName: ContractName;
  tokenName: ContractName;
};

export const usePermitSignature = (props: UsePermitSignatureParams) => {
  const { amount, spenderName, tokenName } = props;

  const permit = usePermit({
    value: amount,
    spenderName,
    tokenName,
  });

  const getPermitSignature = useCallback(async () => {
    const signature = await permit.getPermitSignature();
    if (!signature) {
      throw new Error('Failed to get permit signature');
    }
    return signature;
  }, [permit]);

  return { getPermitSignature, permit };
};
