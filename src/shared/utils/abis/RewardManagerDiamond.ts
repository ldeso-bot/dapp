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
  { inputs: [], name: 'BurnMoreK2SharesThanMinted', type: 'error' },
  { inputs: [], name: 'BurnMoreRYSharesThanMinted', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'K2StakersPositionsOverflow',
    type: 'error',
  },
  { inputs: [], name: 'NotRewardManagerStateUpdater', type: 'error' },
  {
    inputs: [
      { internalType: 'uint8', name: 'bits', type: 'uint8' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SystemPaused', type: 'error' },
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'K2StakersK2RewardsTransferred',
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
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingYield',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sharesBurned',
        type: 'uint256',
      },
    ],
    name: 'K2StakersK2YSharesBurned',
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
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingYield',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sharesMinted',
        type: 'uint256',
      },
    ],
    name: 'K2StakersK2YSharesMinted',
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'K2StakersRYRewardsTransferred',
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
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingYield',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sharesBurned',
        type: 'uint256',
      },
    ],
    name: 'K2StakersRYSharesBurned',
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
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingYield',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sharesMinted',
        type: 'uint256',
      },
    ],
    name: 'K2StakersRYSharesMinted',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'burnSharesForK2Staker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'claimK2StakersRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getK2StakersK2YieldPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'claimableYield',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.K2StakerPositionView',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getK2StakersRYPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'claimableYield',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.K2StakerPositionView',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'mintSharesForK2Staker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'InvalidMaturityId',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'LPRYieldQueueOverflow',
    type: 'error',
  },
  { inputs: [], name: 'NotRewardManagerStateUpdater', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SharesToBurnGTSystem', type: 'error' },
  { inputs: [], name: 'SystemPaused', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'lpToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LPK2YieldTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'lpToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LPRYieldTransferred',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'burnSharesFromLP',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'claimLPRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'getGlobalLPK2Rewards',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'totalRewards', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'globalAccumulator',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastKeeperUpdate',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.GlobalRewardsState',
        name: 'global',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'getGlobalLPRewards',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'totalRewards', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'globalAccumulator',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastKeeperUpdate',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.GlobalRewardsState',
        name: 'global',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'getLpStakersRYDetails',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'totalRewards', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'globalAccumulator',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastKeeperUpdate',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.GlobalRewardsState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUnclaimedK2YRewards',
    outputs: [{ internalType: 'uint256', name: 'rewards', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUnclaimedRYRewards',
    outputs: [{ internalType: 'uint256', name: 'rewards', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUserLPK2Position',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          {
            internalType: 'uint64',
            name: 'lastSettlementMidnightIndex',
            type: 'uint64',
          },
        ],
        internalType: 'struct RewardManagerStorage.LPRewardsPositionView',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUserLPRYPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          {
            internalType: 'uint64',
            name: 'lastSettlementMidnightIndex',
            type: 'uint64',
          },
        ],
        internalType: 'struct RewardManagerStorage.LPRewardsPositionView',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'capital', type: 'uint256' },
    ],
    name: 'mintShareToLP',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'InvalidMaturityId',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'KVCMK2YQueueOverflow',
    type: 'error',
  },
  { inputs: [], name: 'NotRewardManagerStateUpdater', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SharesToBurnGTSystem', type: 'error' },
  { inputs: [], name: 'SystemPaused', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'KVCMK2YieldTransferred',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'burnSharesForKVCMStaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'burnSharesForKVCMStaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'claimKVCMK2Rewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'getKVCMK2YieldGlobalState',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'totalRewards', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'globalAccumulator',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastKeeperUpdate',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.GlobalRewardsState',
        name: 'global',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getKVCMK2YieldPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          {
            internalType: 'uint64',
            name: 'lastSettlementMidnightIndex',
            type: 'uint64',
          },
        ],
        internalType:
          'struct RewardManagerStorage.KVCMStakersK2RewardsPositionView',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getUnclaimedKVCMK2Rewards',
    outputs: [{ internalType: 'uint256', name: 'rewards', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'mintSharesForKVCMStaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
export default abi;
