export default [
  {
    inputs: [
      { internalType: 'address', name: 'cooperator', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'hasApproved',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
