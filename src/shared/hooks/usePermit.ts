import constants from '@/shared/constants/';
import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';
import { ContractName } from '../constants/contracts.constants';
import Permit from '../dal/web3/abis/Permit.json';
import { PermitReturn } from '../dal/web3/web3.types';
import { is0xString, isString } from '../utils/typeguards';
import { useGetContract } from './useGetContract';

type UsePermitParams = {
  /** The name of the contract that will be spending the tokens */
  spenderName: ContractName;
  /** The name of the token to be spent */
  tokenName: ContractName;
  /** The amount of tokens to be spent */
  value: bigint;
};
export function usePermit(params: UsePermitParams) {
  const { spenderName, tokenName, value } = params;
  const { data: walletClient } = useWalletClient();

  const tokenContract = useGetContract(tokenName);
  const spenderContract = useGetContract(spenderName);

  const getPermitSignature =
    useCallback(async (): Promise<PermitReturn | null> => {
      if (!walletClient) throw new Error('Wallet client is not ready');

      if (!tokenContract) throw new Error('Token contract is not ready');

      if (!spenderContract) throw new Error('Spender contract is not ready');

      // The owner address is the address of the wallet client
      const owner = walletClient.account.address;

      const spender = spenderContract.address;

      // Set deadline to 1 hour from now
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24);

      // Get owner nonce from the token contract
      const nonce = await tokenContract.read.nonces([owner]);

      // Compute the EIP712 domain information.
      // TODO: This could be cached at the server level
      const name = await tokenContract.read.name();
      const version = await tokenContract.read.version();

      if (!isString(name)) {
        throw new Error('Name is not a string');
      }
      if (!isString(version)) {
        throw new Error('Version is not a number');
      }

      const domain = {
        name: name,
        version: version,
        chainId: constants.CHAIN.id,
        verifyingContract: tokenContract.address,
      };

      const types = {
        Permit,
      };

      const values = {
        owner,
        spender,
        value,
        nonce,
        deadline,
      };

      // Use walletClient for signing
      const signature = await walletClient.signTypedData({
        account: walletClient.account,
        domain,
        types,
        primaryType: 'Permit',
        message: values,
      });

      const [r, s, v] = [
        signature.slice(0, 66),
        '0x' + signature.slice(66, 130),
        BigInt(parseInt(signature.slice(130, 132), 16)),
      ];

      if (!is0xString(r) || !is0xString(s)) {
        throw new Error('Invalid signature');
      }

      return { deadline, owner, spender, value, r, s, v };
    }, [walletClient, tokenContract, spenderContract, value]);

  return {
    getPermitSignature,
  };
}
