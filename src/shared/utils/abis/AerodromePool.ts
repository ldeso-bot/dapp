const abi = [
  {
    type: 'function',
    name: 'getAmountOut',
    inputs: [
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
      { name: 'tokenIn', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

export default abi;
