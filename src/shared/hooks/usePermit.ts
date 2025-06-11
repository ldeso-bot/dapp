import constants from '@/shared/constants/';
import { getPublicClient } from '@/shared/dal/web3/web3.utils';
import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';
import { ContractName } from '../constants/contracts.constants';
import { PermitReturn } from '../dal/web3/web3.types';
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
      const deadline = 1759649540n; //BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24);

      // Create publicClient from walletClient's chain
      const publicClient = getPublicClient();

      // Get owner nonce from the token contract
      const nonce = await tokenContract.read.nonces([owner]);

      // Get Domain separator from the token contract
      const domainSeparator = await publicClient.readContract({
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: 'DOMAIN_SEPARATOR',
      });

      const domain = {
        name: 'USDC' as unknown as string,
        /** We assume 1 if permit version is not specified */
        version: '1' as unknown as string,
        chainId: constants.CHAIN.id as unknown as number,
        verifyingContract: tokenContract.address as string,
      };

      const types = {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'version',
            type: 'string',
          },
          {
            name: 'chainId',
            type: 'uint256',
          },
          {
            name: 'verifyingContract',
            type: 'address',
          },
        ],
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      };

      const values = {
        //      permitKeccak,
        owner,
        spender,
        value,
        nonce,
        deadline,
      };

      // Use walletClient for signing
      const signature = await walletClient.signTypedData({
        account: walletClient.account,
        domain: {
          name: 'USD Coin',
          version: '2',
          chainId: constants.CHAIN.id,
          verifyingContract: tokenContract.address,
        },
        types,
        primaryType: 'Permit',
        message: values,
      });

      const [r, s, v] = [
        signature.slice(0, 66) as `0x${string}`, // TODO: use a type guard
        ('0x' + signature.slice(66, 130)) as `0x${string}`, // TODO: use a type guard
        BigInt(parseInt(signature.slice(130, 132), 16)),
      ];

      return { deadline, owner, spender, value, r, s, v };
    }, [walletClient, tokenContract, spenderContract, value]);

  return {
    getPermitSignature,
  };
}
