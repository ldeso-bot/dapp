const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'ConversionExceedsUint128',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'totalAccruedYield',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'yieldDistributed',
        type: 'uint256',
      },
    ],
    name: 'InvalidAccruedYield',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maturityTimestamp',
        type: 'uint256',
      },
    ],
    name: 'InvalidLockingInterval',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
    ],
    name: 'InvalidMaturityId',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
    ],
    name: 'InvalidMidnightIndex',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'nextMidnightIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastElementMidnightIndex',
        type: 'uint256',
      },
    ],
    name: 'InvalidQueueOrder',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256',
      },
    ],
    name: 'LockNotFound',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
    ],
    name: 'LockNotYetMatured',
    type: 'error',
  },
  { inputs: [], name: 'NotAuthorized', type: 'error' },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
    ],
    name: 'PPSNotSet',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'bits', type: 'uint8' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SystemPaused', type: 'error' },
  { inputs: [], name: 'TooManyUnprocessedDeposits', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  { inputs: [], name: 'ZeroAmount', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'aam',
        type: 'address',
      },
    ],
    name: 'AAMUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'accessManager',
        type: 'address',
      },
    ],
    name: 'AccessManagerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'carbonLedger',
        type: 'address',
      },
    ],
    name: 'CarbonLedgerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'DustRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'k2',
        type: 'address',
      },
    ],
    name: 'K2TokenUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'k2YieldToken',
        type: 'address',
      },
    ],
    name: 'K2YieldTokenUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'kvcm',
        type: 'address',
      },
    ],
    name: 'KvcmTokenUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'lockOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'yieldAmount',
        type: 'uint256',
      },
    ],
    name: 'LockClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deltaAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalProcessedShares',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndexStart',
        type: 'uint256',
      },
    ],
    name: 'LockUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'maturityManager',
        type: 'address',
      },
    ],
    name: 'MaturityManagerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'protocolSupplyOracle',
        type: 'address',
      },
    ],
    name: 'ProtocolSupplyOracleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'retirementAggregator',
        type: 'address',
      },
    ],
    name: 'RetirementAggregatorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'rewardManager',
        type: 'address',
      },
    ],
    name: 'RewardManagerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'riskyYieldToken',
        type: 'address',
      },
    ],
    name: 'RiskyYieldTokenUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'stakingManager',
        type: 'address',
      },
    ],
    name: 'StakingManagerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPaused',
        type: 'bool',
      },
    ],
    name: 'SystemPauseStatusChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint128',
        name: 'yieldDistributionInterval',
        type: 'uint128',
      },
    ],
    name: 'YieldDistributionIntervalUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256',
      },
    ],
    name: 'getKvcmLockYield',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lockYield',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxUnprocessedDaysForLockDeposits',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'deltaAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
    ],
    name: 'handleActiveLockUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lockOwner',
        type: 'address',
      },
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'handleUnlockAndClaim',
    outputs: [
      {
        internalType: 'uint256',
        name: 'accruedYield',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
export default abi;
