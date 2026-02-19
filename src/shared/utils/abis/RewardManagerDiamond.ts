const abi = [
  {
    inputs: [
      { internalType: 'address', name: '_contractOwner', type: 'address' },
      { internalType: 'address', name: '_diamondCutFacet', type: 'address' },
    ],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'facetAddress', type: 'address' },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        indexed: false,
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'DiamondCut',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  { stateMutability: 'payable', type: 'fallback' },
  { stateMutability: 'payable', type: 'receive' },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'facetAddress', type: 'address' },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      { internalType: 'address', name: '_init', type: 'address' },
      { internalType: 'bytes', name: '_calldata', type: 'bytes' },
    ],
    name: 'diamondCut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'provided', type: 'uint256' },
      { internalType: 'uint256', name: 'maximum', type: 'uint256' },
    ],
    name: 'ArrayTooLarge',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'BetaIsZero',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'DiscountParameterIsZero',
    type: 'error',
  },
  { inputs: [], name: 'EmptyArray', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'targetMidnightIndex', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'currentMidnightIndex',
        type: 'uint256',
      },
    ],
    name: 'InvalidFutureSettlement',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'InvalidMaturityId',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'InvalidMidnightIndex',
    type: 'error',
  },
  { inputs: [], name: 'InvalidStakingManagerAddress', type: 'error' },
  { inputs: [], name: 'K2CirculatingSupplyIsZero', type: 'error' },
  { inputs: [], name: 'KVCMCirculatingSupplyIsZero', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'KVCMYieldIntervalNotSettled',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'aAQ', type: 'uint256' },
      { internalType: 'uint256', name: 'A', type: 'uint256' },
    ],
    name: 'KvcmAQExceedsSupply',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lambdaGG', type: 'uint256' }],
    name: 'LambdaGGExceedsScale',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'LambdasAlreadyFinalized',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'LambdasNotFinalized',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'prevMaturityId', type: 'uint256' },
      { internalType: 'uint256', name: 'currentMaturityId', type: 'uint256' },
    ],
    name: 'MaturityIdsNotSorted',
    type: 'error',
  },
  { inputs: [], name: 'MaturityManagerNotSet', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'NoActiveYieldCurve',
    type: 'error',
  },
  { inputs: [], name: 'NoK2Stakers', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'lpToken', type: 'address' }],
    name: 'NoLPStakesForMaturities',
    type: 'error',
  },
  { inputs: [], name: 'NotAuthorized', type: 'error' },
  { inputs: [], name: 'NotRewardManagerStateUpdater', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'PreviousMidnightNotFinalized',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'lastProcessedIndex', type: 'uint256' },
    ],
    name: 'RYMidnightIndexAlreadyProcessed',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'lastProcessedIndex', type: 'uint256' },
    ],
    name: 'RYMidnightIndexOutOfOrder',
    type: 'error',
  },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  {
    inputs: [
      { internalType: 'uint8', name: 'bits', type: 'uint8' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
    type: 'error',
  },
  { inputs: [], name: 'SystemPaused', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'lpToken', type: 'address' }],
    name: 'UnsupportedLPToken',
    type: 'error',
  },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accumulator',
        type: 'uint256',
      },
    ],
    name: 'K2StakersRYAccumulatorUpdated',
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
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accumulator',
        type: 'uint256',
      },
    ],
    name: 'LPRiskyYieldAccumulatorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'finalGG',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'finalG',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'finalQ',
        type: 'uint256',
      },
    ],
    name: 'LambdasFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRiskyYieldRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'midNightIndex',
        type: 'uint64',
      },
    ],
    name: 'RiskyYieldRewardsGenerated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midNightIndex', type: 'uint256' },
    ],
    name: 'computeFinalizedLambdas',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'finalGG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalQ', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.FinalizationValues',
        name: 'values',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midnightIndex', type: 'uint64' }],
    name: 'computeRY',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'k2StakersDistribution',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.RYDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'computeRYForLPs',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'riskyYield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.LPMaturityYieldWithShares[]',
        name: 'result',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'k2StakersDistribution',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.RYDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    name: 'computeRYForLPsWithDistribution',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'riskyYield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.LPMaturityYieldWithShares[]',
        name: 'result',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'k2StakersDistribution',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.RYDistribution',
        name: 'distribution',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'computeRYForLPsWithSupply',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'riskyYield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.LPMaturityYieldWithShares[]',
        name: 'result',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'kVCMYield', type: 'uint256' },
      { internalType: 'uint256', name: 'discountParam', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'finalGG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalQ', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.FinalizationValues',
        name: 'lambdas',
        type: 'tuple',
      },
    ],
    name: 'computeRYWithLambda',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'k2StakersDistribution',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.RYDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'kvcmK2LP', type: 'address' },
      { internalType: 'address', name: 'kvcmQLP', type: 'address' },
    ],
    name: 'getAllLastProcessedMidnightIndices',
    outputs: [
      {
        internalType: 'uint256',
        name: 'kvcmK2LPLastProcessed',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'kvcmQLPLastProcessed',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'k2LastProcessed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midnightIndex', type: 'uint64' }],
    name: 'getBeta',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getBetaSqCache',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getDailyLambdaCache',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tblambdaG', type: 'uint256' },
          { internalType: 'uint256', name: 'tblambdaQ', type: 'uint256' },
          { internalType: 'uint256', name: 'tblambdaGG', type: 'uint256' },
          {
            internalType: 'uint64',
            name: 'lastLambdaUpdateTimestamp',
            type: 'uint64',
          },
        ],
        internalType: 'struct RewardManagerStorage.DailyLambdaCache',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getK2StakersTotalShares',
    outputs: [
      { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastNonZeroBetaSqIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastProcessedMidnightIndexForK2',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'lpToken', type: 'address' }],
    name: 'getLastProcessedMidnightIndexForLP',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'getRYBetaCache',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'kvcmAllocation', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Allocation', type: 'uint256' },
        ],
        internalType: 'struct RewardManagerStorage.RYBetaCache',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'finalGG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalQ', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.FinalizationValues',
        name: 'values',
        type: 'tuple',
      },
    ],
    name: 'setFinalizedLambdas',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'k2StakersRewards', type: 'uint256' },
      { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
    ],
    name: 'updateAccForK2Stakers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'riskyYield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.LPMaturityYieldWithShares[]',
        name: 'maturityYields',
        type: 'tuple[]',
      },
    ],
    name: 'updateAccForLP',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'k2Allocation_', type: 'uint256' },
      { internalType: 'address', name: 'carbonClass_', type: 'address' },
      { internalType: 'uint64', name: 'midnightIndex_', type: 'uint64' },
    ],
    name: 'updateBetaSqForK2Allocation',
    outputs: [{ internalType: 'uint256', name: 'betaSq', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'k2Allocation_', type: 'uint256' },
      { internalType: 'address', name: 'carbonClass_', type: 'address' },
      { internalType: 'uint64', name: 'midnightIndex_', type: 'uint64' },
    ],
    name: 'updateBetaSqForK2Deallocation',
    outputs: [{ internalType: 'uint256', name: 'betaSq', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'kvcmAllocation_', type: 'uint256' },
      { internalType: 'address', name: 'carbonClass_', type: 'address' },
      { internalType: 'uint64', name: 'midnightIndex_', type: 'uint64' },
    ],
    name: 'updateBetaSqForKvcmAllocation',
    outputs: [{ internalType: 'uint256', name: 'betaSq', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'kvcmAllocation_', type: 'uint256' },
      { internalType: 'address', name: 'carbonClass_', type: 'address' },
      { internalType: 'uint64', name: 'midnightIndex_', type: 'uint64' },
    ],
    name: 'updateBetaSqForKvcmDeallocation',
    outputs: [{ internalType: 'uint256', name: 'betaSq', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midNightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'totalK2Allocations', type: 'uint256' },
    ],
    name: 'updateRewardsProportions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'L', type: 'uint256' },
      { internalType: 'uint256', name: 'k2Supply', type: 'uint256' },
    ],
    name: 'K2InLPExceedsSupply',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'G', type: 'uint256' },
      { internalType: 'uint256', name: 'k2Supply', type: 'uint256' },
    ],
    name: 'K2StakedExceedsSupply',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'lastProcessedIndex', type: 'uint256' },
    ],
    name: 'K2YMidnightIndexAlreadyProcessed',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'lastProcessedIndex', type: 'uint256' },
    ],
    name: 'K2YMidnightIndexOutOfOrder',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'kvcmStaked', type: 'uint256' },
      { internalType: 'uint256', name: 'kvcmSupply', type: 'uint256' },
    ],
    name: 'KVCMStakedExceedsSupply',
    type: 'error',
  },
  { inputs: [], name: 'NoKVCMStakesForMaturities', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
      { internalType: 'uint256', name: 'k2Supply', type: 'uint256' },
    ],
    name: 'TotalSharesExceedsK2Supply',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'relUtilisation', type: 'uint256' },
      { internalType: 'uint256', name: 'absoluteUtilisation', type: 'uint256' },
    ],
    name: 'UtilisationExceedsScale',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'yield', type: 'uint256' },
      { internalType: 'uint256', name: 'dailyEmission', type: 'uint256' },
    ],
    name: 'YieldExceedsDailyEmission',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'yield', type: 'uint256' },
      { internalType: 'uint256', name: 'escrowBalance', type: 'uint256' },
    ],
    name: 'YieldExceedsEscrowBalance',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accumulator',
        type: 'uint256',
      },
    ],
    name: 'K2StakersK2YieldAccumulatorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
    ],
    name: 'K2YieldDistributedToTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accumulator',
        type: 'uint256',
      },
    ],
    name: 'KVCMK2YieldAccumulatorUpdated',
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
        internalType: 'uint64',
        name: 'midnightIndex',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maturityId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalRewards',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accumulator',
        type: 'uint256',
      },
    ],
    name: 'LPK2YieldAccumulatorUpdated',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midNightIndex', type: 'uint64' }],
    name: 'computeK2YDistribution',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midNightIndex', type: 'uint64' }],
    name: 'computeK2YDistributionForKVCMStakers',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'finalGG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalG', type: 'uint256' },
          { internalType: 'uint256', name: 'finalQ', type: 'uint256' },
        ],
        internalType: 'struct IRiskyYieldFacet.FinalizationValues',
        name: 'lambdas',
        type: 'tuple',
      },
    ],
    name: 'computeK2YDistributionWithLambdas',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midNightIndex', type: 'uint64' }],
    name: 'computeK2YForAGLPs',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    name: 'computeK2YForAGLPsWithDistribution',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'computeK2YForAGLPsWithSupply',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'midNightIndex', type: 'uint64' }],
    name: 'computeK2YForAQLPs',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    name: 'computeK2YForAQLPsWithDistribution',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'computeK2YForAQLPsWithSupply',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
    ],
    name: 'computeK2YForKVCMStakersWithDistribution',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'k2Stakers', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmStakers', type: 'uint256' },
          { internalType: 'uint256', name: 'treasury', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmK2LP', type: 'uint256' },
          { internalType: 'uint256', name: 'kvcmQLP', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.K2YDistribution',
        name: 'distribution',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'computeK2YForKVCMStakersWithSupply',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        internalType: 'uint256',
        name: 'totalK2YieldForTreasury',
        type: 'uint256',
      },
    ],
    name: 'distributeK2YToTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'k2LP', type: 'address' },
      { internalType: 'address', name: 'qLP', type: 'address' },
    ],
    name: 'getK2YieldLastProcessedIndices',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'lastProcessedMidnightIndexKVCM',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastProcessedMidnightIndexK2Stakers',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastProcessedMidnightIndexTreasury',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastProcessedMidnightIndexK2LP',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastProcessedMidnightIndexQLP',
            type: 'uint128',
          },
        ],
        internalType: 'struct IK2YieldFacet.K2YieldProcessedIndices',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        internalType: 'uint256',
        name: 'totalK2YieldForK2Stakers',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
    ],
    name: 'updateK2YAccForK2Stakers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'yields',
        type: 'tuple[]',
      },
    ],
    name: 'updateK2YAccForKVCMStakers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint64', name: 'midNightIndex', type: 'uint64' },
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'k2Yield', type: 'uint256' },
          { internalType: 'uint256', name: 'totalShares', type: 'uint256' },
        ],
        internalType: 'struct IK2YieldFacet.MaturityYieldWithShares[]',
        name: 'maturityYields',
        type: 'tuple[]',
      },
    ],
    name: 'updateK2YAccForLPs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'AlreadyInitialized', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'InvalidAmountTooLarge',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'InvalidAmountTooSmall',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
    name: 'InvalidMaturityTimestamp',
    type: 'error',
  },
  { inputs: [], name: 'NotSystemAdmin', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv_Overflow',
    type: 'error',
  },
  { inputs: [], name: 'PRBMath_SD59x18_Div_InputTooSmall', type: 'error' },
  {
    inputs: [
      { internalType: 'SD59x18', name: 'x', type: 'int256' },
      { internalType: 'SD59x18', name: 'y', type: 'int256' },
    ],
    name: 'PRBMath_SD59x18_Div_Overflow',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'SD59x18', name: 'x', type: 'int256' }],
    name: 'PRBMath_SD59x18_Exp2_InputTooBig',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'SD59x18', name: 'x', type: 'int256' }],
    name: 'PRBMath_SD59x18_Exp_InputTooBig',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'SD59x18', name: 'x', type: 'int256' }],
    name: 'PRBMath_SD59x18_Log_InputTooSmall',
    type: 'error',
  },
  { inputs: [], name: 'ZeroAmount', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      { indexed: false, internalType: 'uint256', name: 'T', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
      { indexed: false, internalType: 'int256', name: 'x0', type: 'int256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'P0_wad',
        type: 'uint256',
      },
    ],
    name: 'ScheduleUpdated',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'ts', type: 'uint256' }],
    name: 'cumulativeAllocatedAt',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'dailyEmission',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'fromTs', type: 'uint256' },
      { internalType: 'uint256', name: 'toTs', type: 'uint256' },
    ],
    name: 'emissionBetween',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getK2YieldCurveParams',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'rewardCap', type: 'uint256' },
          { internalType: 'uint256', name: 'start', type: 'uint256' },
          { internalType: 'uint256', name: 'T', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'int256', name: 'x0', type: 'int256' },
          { internalType: 'uint256', name: 'P0_wad', type: 'uint256' },
          { internalType: 'uint256', name: 'P_end_wad', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'cumulativeOffset',
            type: 'uint256',
          },
        ],
        internalType: 'struct IK2YieldCurveFacet.K2YieldCurveParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_rewardCap', type: 'uint256' },
      { internalType: 'uint256', name: '_start', type: 'uint256' },
      { internalType: 'uint256', name: '_T', type: 'uint256' },
      { internalType: 'uint256', name: '_duration', type: 'uint256' },
      { internalType: 'uint256', name: '_P0_wad', type: 'uint256' },
    ],
    name: 'initK2YieldSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'newStart', type: 'uint256' },
      { internalType: 'uint256', name: 'newT', type: 'uint256' },
      { internalType: 'uint256', name: 'newDuration', type: 'uint256' },
      { internalType: 'uint256', name: 'newP0_wad', type: 'uint256' },
    ],
    name: 'updateSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SharesToBurnGTSystem', type: 'error' },
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
    name: 'LPK2YieldSharesBurned',
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
    name: 'LPK2YieldSharesMinted',
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
    name: 'LPRYieldSharesBurned',
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
    name: 'LPRYieldSharesMinted',
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
    name: 'getUserLPK2YEntries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'settledMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.Entry[]',
        name: 'entries',
        type: 'tuple[]',
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
    name: 'getUserLPRYEntries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'settledMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.Entry[]',
        name: 'entries',
        type: 'tuple[]',
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
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'previewClaimLPRewards',
    outputs: [
      { internalType: 'uint256', name: 'ryAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'k2Amount', type: 'uint256' },
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
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
    name: 'getK2StakerK2YEntries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'settledMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.Entry[]',
        name: 'entries',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getK2StakerRYEntries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'settledMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.Entry[]',
        name: 'entries',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getK2StakersK2YieldGlobalState',
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
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getK2StakersK2YieldPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          { internalType: 'uint256', name: 'claimableYield', type: 'uint256' },
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
    inputs: [],
    name: 'getK2StakersRYGlobalState',
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
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getK2StakersRYPosition',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
          { internalType: 'uint256', name: 'claimableYield', type: 'uint256' },
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
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'previewClaimK2StakersRewards',
    outputs: [
      { internalType: 'uint256', name: 'ryAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'k2Amount', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'aam', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
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
      { indexed: false, internalType: 'address', name: 'k2', type: 'address' },
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
        name: 'kvcmK2LPToken',
        type: 'address',
      },
    ],
    name: 'KvcmK2LPTokenUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'kvcmQLPToken',
        type: 'address',
      },
    ],
    name: 'KvcmQLPTokenUpdated',
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
        indexed: true,
        internalType: 'address',
        name: 'protocolMinter',
        type: 'address',
      },
    ],
    name: 'ProtocolMinterUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'protocolRewardsEscrow',
        type: 'address',
      },
    ],
    name: 'ProtocolRewardsEscrowUpdated',
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
        components: [
          { internalType: 'address', name: 'aam', type: 'address' },
          { internalType: 'address', name: 'accessManager', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolSupplyOracle',
            type: 'address',
          },
          { internalType: 'address', name: 'protocolMinter', type: 'address' },
          { internalType: 'address', name: 'stakingManager', type: 'address' },
          { internalType: 'address', name: 'kvcmToken', type: 'address' },
          { internalType: 'address', name: 'k2Token', type: 'address' },
          { internalType: 'address', name: 'maturityManager', type: 'address' },
          { internalType: 'address', name: 'kvcmK2LPToken', type: 'address' },
          { internalType: 'address', name: 'kvcmQLPToken', type: 'address' },
          { internalType: 'address', name: 'riskyYieldToken', type: 'address' },
          { internalType: 'address', name: 'k2YieldToken', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolRewardsEscrow',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'struct RewardManagerStorage.RMConfig',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'RewardManagerConfigurationUpdated',
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
      { indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' },
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
    inputs: [],
    name: 'getAAM',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAccessManager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getK2YieldToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getKvcmK2LPToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getKvcmQLPToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getKvcmToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaturityManager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPauseStates',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'systemPaused', type: 'bool' },
          { internalType: 'bool', name: 'kvcmLockPaused', type: 'bool' },
          { internalType: 'bool', name: 'k2LockPaused', type: 'bool' },
          { internalType: 'bool', name: 'riskyYieldPaused', type: 'bool' },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct RewardManagerStorage.RewardManagerPauseLayout',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProtocolMinter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProtocolRewardsEscrow',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProtocolSupplyOracle',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRMConfiguration',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'aam', type: 'address' },
          { internalType: 'address', name: 'accessManager', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolSupplyOracle',
            type: 'address',
          },
          { internalType: 'address', name: 'protocolMinter', type: 'address' },
          { internalType: 'address', name: 'stakingManager', type: 'address' },
          { internalType: 'address', name: 'kvcmToken', type: 'address' },
          { internalType: 'address', name: 'k2Token', type: 'address' },
          { internalType: 'address', name: 'maturityManager', type: 'address' },
          { internalType: 'address', name: 'kvcmK2LPToken', type: 'address' },
          { internalType: 'address', name: 'kvcmQLPToken', type: 'address' },
          { internalType: 'address', name: 'riskyYieldToken', type: 'address' },
          { internalType: 'address', name: 'k2YieldToken', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolRewardsEscrow',
            type: 'address',
          },
        ],
        internalType: 'struct RewardManagerStorage.RMConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRiskyYieldToken',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakingManager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSupplyOracle',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getYieldDistributionInterval',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_accessManager', type: 'address' },
    ],
    name: 'initAccessManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isSystemPaused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'aam', type: 'address' }],
    name: 'setAAM',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_accessManager', type: 'address' },
    ],
    name: 'setAccessManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'k2YieldToken', type: 'address' },
    ],
    name: 'setK2YieldToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'kvcmK2LPToken', type: 'address' },
    ],
    name: 'setKvcmK2LPToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'kvcmQLPToken', type: 'address' },
    ],
    name: 'setKvcmQLPToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'kvcmToken', type: 'address' }],
    name: 'setKvcmToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lpToken', type: 'address' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'uint256', name: 'lastUpdate', type: 'uint256' },
    ],
    name: 'setLastKeeperUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'maturityManager', type: 'address' },
    ],
    name: 'setMaturityManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'protocolMinter', type: 'address' },
    ],
    name: 'setProtocolMinter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'protocolRewardsEscrow',
        type: 'address',
      },
    ],
    name: 'setProtocolRewardsEscrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'protocolSupplyOracle',
        type: 'address',
      },
    ],
    name: 'setProtocolSupplyOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'aam', type: 'address' },
          { internalType: 'address', name: 'accessManager', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolSupplyOracle',
            type: 'address',
          },
          { internalType: 'address', name: 'protocolMinter', type: 'address' },
          { internalType: 'address', name: 'stakingManager', type: 'address' },
          { internalType: 'address', name: 'kvcmToken', type: 'address' },
          { internalType: 'address', name: 'k2Token', type: 'address' },
          { internalType: 'address', name: 'maturityManager', type: 'address' },
          { internalType: 'address', name: 'kvcmK2LPToken', type: 'address' },
          { internalType: 'address', name: 'kvcmQLPToken', type: 'address' },
          { internalType: 'address', name: 'riskyYieldToken', type: 'address' },
          { internalType: 'address', name: 'k2YieldToken', type: 'address' },
          {
            internalType: 'address',
            name: 'protocolRewardsEscrow',
            type: 'address',
          },
        ],
        internalType: 'struct RewardManagerStorage.RMConfig',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setRMConfiguration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'riskyYieldToken', type: 'address' },
    ],
    name: 'setRiskyYieldToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'stakingManager', type: 'address' },
    ],
    name: 'setStakingManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'supplyOracle', type: 'address' },
    ],
    name: 'setSupplyOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'paused', type: 'bool' }],
    name: 'setSystemPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'yieldDistributionInterval',
        type: 'uint128',
      },
    ],
    name: 'setYieldDistributionInterval',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'ConversionExceedsUint128',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'totalAccruedYield', type: 'uint256' },
      { internalType: 'uint256', name: 'yieldDistributed', type: 'uint256' },
    ],
    name: 'InvalidAccruedYield',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityTimestamp', type: 'uint256' },
    ],
    name: 'InvalidLockingInterval',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'nextMidnightIndex', type: 'uint256' },
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
    inputs: [{ internalType: 'uint256', name: 'lockId', type: 'uint256' }],
    name: 'LockNotFound',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'LockNotYetMatured',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'PPSNotSet',
    type: 'error',
  },
  { inputs: [], name: 'TooManyUnprocessedDeposits', type: 'error' },
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
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
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
    inputs: [
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getKvcmLockYield',
    outputs: [{ internalType: 'uint256', name: 'lockYield', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lockId', type: 'uint256' }],
    name: 'getKvcmLockYield',
    outputs: [{ internalType: 'uint256', name: 'lockYield', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxUnprocessedDaysForLockDeposits',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      { internalType: 'uint256', name: 'deltaAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'handleActiveLockUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lockOwner', type: 'address' },
      { internalType: 'uint256', name: 'lockId', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'handleUnlockAndClaim',
    outputs: [
      { internalType: 'uint256', name: 'accruedYield', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'targetMidnightIndex', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'totalEffectiveLocked',
        type: 'uint256',
      },
    ],
    name: 'InconsistentSupplyForLocked',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'IntervalAlreadySettled',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'InvalidCirculatingSupply',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'firstMaturityId', type: 'uint256' },
      { internalType: 'uint256', name: 'lastMaturityId', type: 'uint256' },
    ],
    name: 'InvalidMaturityRange',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maturityYieldForInterval',
        type: 'uint256',
      },
    ],
    name: 'InvalidMaturityYieldForInterval',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'passedLength', type: 'uint256' },
      { internalType: 'uint256', name: 'expectedLength', type: 'uint256' },
    ],
    name: 'InvalidMaturityYields',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'currentMidnightIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastMidnightIndexYieldDistribution',
        type: 'uint256',
      },
    ],
    name: 'InvalidPreviousMidnightIndex',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'UD60x18', name: 'x', type: 'uint256' }],
    name: 'PRBMath_UD60x18_Exp2_InputTooBig',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'UD60x18', name: 'x', type: 'uint256' }],
    name: 'PRBMath_UD60x18_Exp_InputTooBig',
    type: 'error',
  },
  { inputs: [], name: 'YieldDistributionIntervalNotSet', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'ZeroCirculatingSupply',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'midnightIndex',
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
        name: 'yieldForCurrentInterval',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ppsAtRoll',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalSharesAtRoll',
        type: 'uint256',
      },
    ],
    name: 'MaturityRollSettled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalYieldToMint',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'midnightIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'discountParameter',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'circulatingSupply',
        type: 'uint256',
      },
    ],
    name: 'YieldDistributionSettled',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint128', name: 'midnightIndex', type: 'uint128' },
    ],
    name: 'computeDayAheadLockYieldsAtIndex',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'rawLockIssueForInterval',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'zeroCouponYield', type: 'uint256' },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct IRollUpdateFacet.MaturityYields[]',
        name: 'yields',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'currentCirculatingSupply',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'discountParameter', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'targetMidnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'discountParameter', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'circulatingSupplySnapshot',
        type: 'uint256',
      },
      {
        components: [
          { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'rawLockIssueForInterval',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'zeroCouponYield', type: 'uint256' },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct IRollUpdateFacet.MaturityYields[]',
        name: 'maturityYields',
        type: 'tuple[]',
      },
    ],
    name: 'distributeKvcmLockYieldForInterval',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFullCurveValues',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'discountFactor', type: 'uint256' },
          { internalType: 'uint256', name: 'zeroCouponYield', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'yieldForCurrentInterval',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deltaForCurrentPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalKvcmLockedForBucket',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRollUpdateFacet.YieldCurvePoint[]',
        name: 'yieldCurve',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalEffectiveKvcmLocked',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'discountParameter', type: 'uint256' },
      { internalType: 'uint256', name: 'rawTotalLockIssue', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'targetMidnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'referenceTimestamp', type: 'uint256' },
    ],
    name: 'getFullCurveValuesForInterval',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'discountFactor', type: 'uint256' },
          { internalType: 'uint256', name: 'zeroCouponYield', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'yieldForCurrentInterval',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deltaForCurrentPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalKvcmLockedForBucket',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRollUpdateFacet.YieldCurvePoint[]',
        name: 'yieldCurve',
        type: 'tuple[]',
      },
      { internalType: 'uint256', name: 'totalKvcmLocked', type: 'uint256' },
      { internalType: 'uint256', name: 'discountParameter', type: 'uint256' },
      { internalType: 'uint256', name: 'rawTotalLockIssue', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'targetMidnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'referenceTimestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'circulatingSupply', type: 'uint256' },
    ],
    name: 'getFullCurveValuesForIntervalWithSupply',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint256', name: 'discountFactor', type: 'uint256' },
          { internalType: 'uint256', name: 'zeroCouponYield', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'yieldForCurrentInterval',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deltaForCurrentPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalKvcmLockedForBucket',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRollUpdateFacet.YieldCurvePoint[]',
        name: 'yieldCurve',
        type: 'tuple[]',
      },
      { internalType: 'uint256', name: 'totalKvcmLocked', type: 'uint256' },
      { internalType: 'uint256', name: 'discountParameter', type: 'uint256' },
      { internalType: 'uint256', name: 'rawTotalLockIssue', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'getCurrentMaturityTotals',
    outputs: [
      { internalType: 'uint256', name: 'totalRawPrincipal', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'totalSharesForMaturity',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'getDiscountFactor',
    outputs: [
      { internalType: 'uint64', name: 'discountFactor', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getDiscountFactors',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
          { internalType: 'uint64', name: 'discountFactor', type: 'uint64' },
        ],
        internalType: 'struct IRewardManager.MaturityDiscountFactor[]',
        name: 'discountFactors',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'activeMaturities',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maturityId', type: 'uint256' }],
    name: 'getFullMaturityTotals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'lastUpdateTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalRawPrincipal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalSharesForMaturity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalMintedYieldRemaining',
            type: 'uint256',
          },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct RewardManagerStorage.MaturityTotals',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getIntervalData',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'settled', type: 'bool' },
          { internalType: 'uint128', name: 'rollTimestamp', type: 'uint128' },
          {
            internalType: 'uint128',
            name: 'discountParameterAtRoll',
            type: 'uint128',
          },
          { internalType: 'uint256', name: 'supplyAtRoll', type: 'uint256' },
          { internalType: 'uint256', name: 'kVCMYield', type: 'uint256' },
        ],
        internalType: 'struct RewardManagerStorage.IntervalData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getIntervalSettled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getK2K2YAccSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'midnightAccumulator',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.AccumulatorSnapshot',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getK2RYAccSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'midnightAccumulator',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.AccumulatorSnapshot',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getKVCMK2YAccSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'midnightAccumulator',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.AccumulatorSnapshot',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lockId', type: 'uint256' }],
    name: 'getKvcmLock',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'maturityId', type: 'uint128' },
          {
            internalType: 'uint128',
            name: 'midnightIndexStart',
            type: 'uint128',
          },
          {
            internalType: 'uint128[][]',
            name: 'unprocessedDeposits',
            type: 'uint128[][]',
          },
          { internalType: 'uint256', name: 'rawPrincipal', type: 'uint256' },
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'enum RewardManagerStorage.LockStatus',
            name: 'status',
            type: 'uint8',
          },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct RewardManagerStorage.KvcmLockView',
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
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getLPK2YAccSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'midnightAccumulator',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.AccumulatorSnapshot',
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
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
    ],
    name: 'getLPRYAccSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'midnightAccumulator',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.AccumulatorSnapshot',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastMidnightIndexYieldDistribution',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
    ],
    name: 'getMaturityIntervalData',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'ppsAtRoll', type: 'uint128' },
          {
            internalType: 'uint128',
            name: 'totalSharesAtRoll',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'yieldForCurrentInterval',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'depositsDuringInterval',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalEffectivePrincipalAtRoll',
            type: 'uint256',
          },
          { internalType: 'uint256[50]', name: '_gap', type: 'uint256[50]' },
        ],
        internalType: 'struct RewardManagerStorage.MaturityIntervalData',
        name: '',
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
    name: 'KVCMK2YQueueOverflow',
    type: 'error',
  },
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
    name: 'KVCMK2YieldSharesBurned',
    type: 'event',
  },
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
    name: 'KVCMK2YieldSharesMinted',
    type: 'event',
  },
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
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getKVCMK2YEntries',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'shares', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'settledMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct RewardManagerStorage.Entry[]',
        name: 'entries',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
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
  {
    inputs: [
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'previewClaimKVCMK2Rewards',
    outputs: [{ internalType: 'uint256', name: 'k2Amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: 'owner_', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
export default abi;
