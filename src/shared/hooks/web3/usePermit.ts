import { ContractName } from '@/shared/constants/contracts.constants';
import Permit from '@/shared/utils/abis/Permit.json';
import { is0xString, isString } from '@/shared/utils/typeguards';
import { PermitReturn } from '@/shared/utils/web3.types';
import { useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { useContract } from './useContract';

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
  const { chain } = useAccount();

  const { contract: tokenContract } = useContract(tokenName);
  const { contract: spenderContract } = useContract(spenderName);

  const getPermitSignature =
    useCallback(async (): Promise<PermitReturn | null> => {
      if (!walletClient) throw new Error('Wallet client is not ready');

      if (!tokenContract) throw new Error('Token contract is not ready');

      if (!spenderContract) throw new Error('Spender contract is not ready');

      if (!chain) throw new Error('Account is not ready');

      // The owner address is the address of the wallet client
      const owner = walletClient.account.address;

      const spender = spenderContract.address;

      // Set deadline to 1 hour from now
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24);

      // Get owner nonce from the token contract
      const noncesFn = tokenContract.read.nonces;
      if (!noncesFn) throw new Error('nonces function not found on contract');
      const nonce = await noncesFn([owner]);

      // Compute the EIP712 domain information.
      // TODO: This could be cached at the server level
      if (!tokenContract) throw new Error('Token contract is not ready');
      const nameFn = tokenContract.read.name;
      if (!nameFn) throw new Error('name function not found on contract');
      const name = await nameFn();

      // Try to get version, fallback to "1" if not available
      let version = '1';
      try {
        const versionFn = tokenContract.read.version;
        if (versionFn) {
          const versionResult = await versionFn();
          if (isString(versionResult)) {
            version = versionResult;
          }
        }
      } catch (error) {
        console.warn('Using default version "1" for permit signature', error);
      }

      if (!isString(name)) {
        throw new Error('Name is not a string');
      }

      const domain = {
        name,
        version,
        chainId: chain.id,
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
    }, [walletClient, tokenContract, spenderContract, value, chain]);

  return {
    getPermitSignature,
  };
}
