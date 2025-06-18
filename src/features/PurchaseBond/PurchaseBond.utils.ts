import constants from '@/shared/constants/';
import { PermitReturn } from '@/shared/dal/web3/web3.types';
import { handleWeb3Error } from '@/shared/dal/web3/web3.utils';
import { useGetContract } from '@/shared/hooks/useGetContract';
import { usePermit } from '@/shared/hooks/usePermit';
import { useCallback } from 'react';
import { z } from 'zod';

export const useTransferWithPermit = () => {
  const permit = usePermit({
    spenderName: 'USDCTransferWithPermit',
    tokenName: 'USDC',
    value: 1n,
  });

  const contract = useGetContract('USDCTransferWithPermit');

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
        { chain: constants.CHAIN }
      );

      return {
        error: null,
      };
    } catch (error) {
      return handleWeb3Error(error);
    }
  }, [permit, contract]);

  return {
    contract,
    send,
  };
};

export const zodMaturityDate = z.preprocess((i: unknown): number => {
  return new Date().getTime() + Number(i) * 1000;
}, z.coerce.number());
