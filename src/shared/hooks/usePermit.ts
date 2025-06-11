import constants from '@/shared/constants';
import { getMethodKeccak, getPublicClient } from '@/shared/dal/web3/web3.utils';
import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';
import { ContractName } from '../constants/contracts.constants';
import { useGetContract } from './useGetContract';

const PERMIT_KECCAK: `0x${string}` = getMethodKeccak(
  'Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'
);

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

  const getPermitSignature = useCallback(async () => {
    if (!walletClient) {
      console.error('Wallet client is not ready');
      return null;
    }

    if (!tokenContract) {
      console.error('Token contract is not ready');
      return null;
    }

    if (!spenderContract) {
      console.error('Spender contract is not ready');
      return null;
    }

    // The owner address is the address of the wallet client
    const ownerAddress = walletClient.account.address;

    const spenderAddress = spenderContract.address;

    // Set deadline to 1 hour from now
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

    // Create publicClient from walletClient's chain
    const publicClient = getPublicClient();

    // Get owner nonce from the token contract
    const nonce = await tokenContract.read.nonces([ownerAddress]);

    console.info(nonce);

    // Get Domain separator from the token contract
    const domainSeparator = await publicClient.readContract({
      address: tokenContract.address,
      abi: tokenContract.abi,
      functionName: 'DOMAIN_SEPARATOR',
    });

    const domain = {
      name: 'KlimaV2',
      version: '1',
      chainId: constants.CHAIN.id,
      verifyingContract: tokenContract.address,
      salt: domainSeparator as `0x${string}`, // TODO: use a type guard
    };

    const types = {
      Permit: [
        { name: 'permitKeccak', type: 'bytes32' },
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    };

    const values = {
      permitKeccak: PERMIT_KECCAK,
      owner: ownerAddress,
      spender: spenderAddress,
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
      parseInt(signature.slice(130, 132), 16),
    ];

    return { r, s, v };
  }, [walletClient, tokenContract, spenderContract, value]);

  return {
    getPermitSignature,
  };
}
