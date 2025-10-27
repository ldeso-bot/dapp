import { AllocationToken } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import { usePermit } from '@/shared/hooks/web3/usePermit';
import { YieldRate } from '@/shared/models/ProtocolData';
import { PermitReturn } from '@/shared/utils/web3.types';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

export type LockTokenFields = {
  token: string;
  amount: number;
  duration: number;
  maturityDate?: number;
};

export const lockTokenDialogAtom = atom({
  open: false,
  token: null as AllocationToken | null,
});

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

export const findClosestMaturityByDays = (targetDays: number, yieldData: YieldRate[]) => {
  return yieldData.reduce((closest: YieldRate, current: YieldRate) => {
    return Math.abs(current.days ?? 0 - targetDays) < Math.abs(closest.days ?? 0 - targetDays) ? current : closest
  })
}