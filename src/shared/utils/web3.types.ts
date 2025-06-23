import { Signature } from 'viem';

export type ViemError = Error & {
  shortMessage: string;
};

export type PermitReturn = Signature & {
  deadline: bigint;
  value: bigint;
  owner: `0x${string}`;
  spender: `0x${string}`;
};
