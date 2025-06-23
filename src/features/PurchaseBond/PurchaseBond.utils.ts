import { useContract } from '@/shared/hooks/web3/useContract';
import { usePermit } from '@/shared/hooks/web3/usePermit';
import { PermitReturn } from '@/shared/utils/web3.types';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { z } from 'zod';

export const useTransferWithPermit = () => {
  const permit = usePermit({
    spenderName: 'USDCTransferWithPermit',
    tokenName: 'USDC',
    value: 1n,
  });

  const { contract } = useContract('USDCTransferWithPermit');
  const { chain } = useAccount();

  const send = useCallback(async () => {
    let signature: PermitReturn | null = null;
    try {
      signature = await permit.getPermitSignature();

      if (!signature) {
        return {
          error: 'Signature is not ready',
        };
      }
      if (!contract) {
        return {
          error: 'Contract is not ready',
        };
      }
      const { owner, value, deadline, r, s, v } = signature;

      await contract.write.transferWithPermit(
        [
          owner,
          '0x061138CBfEA4531D9ae118e36B86e7CD27649523',
          value,
          deadline,
          v,
          r,
          s,
        ],
        { chain }
      );

      return {
        error: null,
      };
    } catch (error) {
      return handleWeb3Error(error);
    }
  }, [permit, contract, chain]);

  return {
    contract,
    send,
  };
};

export const zodMaturityDate = z.preprocess((i: unknown): number => {
  return new Date().getTime() + Number(i) * 1000;
}, z.coerce.number());
