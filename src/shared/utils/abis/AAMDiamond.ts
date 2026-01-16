const abi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'expected', type: 'uint256' },
      { internalType: 'uint256', name: 'actual', type: 'uint256' },
    ],
    name: 'InsufficientKvcmOut',
    type: 'error',
  },
  { inputs: [], name: 'InvalidRecipient', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'expected', type: 'uint256' },
      { internalType: 'uint256', name: 'actual', type: 'uint256' },
    ],
    name: 'MaxKvcmInExceeded',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'NoQuoterForClass',
    type: 'error',
  },
  { inputs: [], name: 'NotAuthorized', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv18_Overflow',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv_Overflow',
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
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
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
  { inputs: [], name: 'ZeroRate', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'carbonClass',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'quoter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tonnageAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'retiringEntity',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'retiringReason',
        type: 'string',
      },
    ],
    name: 'CarbonRetiredViaRA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'carbonClass',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'quoter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tonnageAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'kvcmAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'CarbonSwap',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'carbonClass',
            type: 'address',
          },
          { internalType: 'address', name: 'credit', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'maxKvcmIn', type: 'uint256' },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'tonnes',
                type: 'uint256',
              },
              { internalType: 'address', name: 'from', type: 'address' },
            ],
            internalType: 'struct ICarbonClassVault.CouponBurnParams',
            name: 'couponBurnParams',
            type: 'tuple',
          },
        ],
        internalType:
          'struct IOperationsFacet.RetireCarbonCreditViaAggregatorParams',
        name: 'retireParams',
        type: 'tuple',
      },
    ],
    name: 'retireCarbonCreditViaAggregator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'carbonClass',
            type: 'address',
          },
          { internalType: 'address', name: 'credit', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'maturityId',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'minKvcmOut',
            type: 'uint256',
          },
          { internalType: 'address', name: 'recipient', type: 'address' },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'tonnes',
                type: 'uint256',
              },
              { internalType: 'address', name: 'from', type: 'address' },
            ],
            internalType: 'struct ICarbonClassVault.CouponBurnParams',
            name: 'couponBurnParams',
            type: 'tuple',
          },
        ],
        internalType: 'struct IOperationsFacet.SwapCarbonCreditForKvcmParams',
        name: 'swapParams',
        type: 'tuple',
      },
    ],
    name: 'swapCarbonCreditForKvcm',
    outputs: [{ internalType: 'uint256', name: 'kvcmOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maturityLength',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'discountFactorLength',
        type: 'uint256',
      },
    ],
    name: 'ActiveMaturityLengthMismatch',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'expected', type: 'uint256' },
      { internalType: 'uint256', name: 'actual', type: 'uint256' },
    ],
    name: 'InsufficientKvcmOut',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'InvalidAmountTooSmall',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'InvalidCarbonClass',
    type: 'error',
  },
  { inputs: [], name: 'InvalidQuoteType', type: 'error' },
  { inputs: [], name: 'InvalidRecipient', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'NoQuoterForClass',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'NoQuoterForClass',
    type: 'error',
  },
  { inputs: [], name: 'NotAuthorized', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv18_Overflow',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv_Overflow',
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
  {
    inputs: [
      { internalType: 'address', name: 'quoter', type: 'address' },
      { internalType: 'bytes', name: 'reason', type: 'bytes' },
    ],
    name: 'RetirementFailed',
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
      { internalType: 'address', name: 'quoter', type: 'address' },
      { internalType: 'bytes', name: 'reason', type: 'bytes' },
    ],
    name: 'SwapFailed',
    type: 'error',
  },
  { inputs: [], name: 'SystemPaused', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'carbonClass', type: 'address' }],
    name: 'ZeroAllocationForClass',
    type: 'error',
  },
  { inputs: [], name: 'ZeroAllocationSnapshotValue', type: 'error' },
  { inputs: [], name: 'ZeroRate', type: 'error' },
  {
    inputs: [],
    name: 'DISCOUNT_FACTOR_FALLBACK_LENGTH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'quoter', type: 'address' }],
    name: 'getClassForQuoter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'midnightIndex', type: 'uint256' },
      { internalType: 'address', name: 'carbonClass', type: 'address' },
    ],
    name: 'getDiscountedForwardBalanceRecordForIndex',
    outputs: [
      { internalType: 'bool', name: 'initialized', type: 'bool' },
      { internalType: 'uint256', name: 'storedBaseline', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'carbonClass', type: 'address' },
      { internalType: 'address', name: 'credit', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'tonnes', type: 'uint256' },
          { internalType: 'address', name: 'from', type: 'address' },
        ],
        internalType: 'struct ICarbonClassVault.CouponBurnParams',
        name: 'couponBurnParams',
        type: 'tuple',
      },
    ],
    name: 'getRetirementQuote',
    outputs: [
      { internalType: 'uint256', name: 'tonnes', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'kvcmRetirementPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'currentMidnightIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountUsedForSwapQuote',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountedForwardBalanceForCurrentMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType:
          'struct IQuoterRouterFacet.DiscountedForwardBalanceContext',
        name: 'discountedForwardBalanceContext',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'preTxnLiquidSupply',
            type: 'uint256',
          },
        ],
        internalType:
          'struct IQuoterRouterFacet.UpdateLiquidSupplyRateLimiterParams',
        name: 'updateLiquidSupplyRateLimiterParams',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'carbonClass', type: 'address' },
      { internalType: 'address', name: 'credit', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'maturityId', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'tonnes', type: 'uint256' },
          { internalType: 'address', name: 'from', type: 'address' },
        ],
        internalType: 'struct ICarbonClassVault.CouponBurnParams',
        name: 'couponBurnParams',
        type: 'tuple',
      },
    ],
    name: 'getSwapQuote',
    outputs: [
      { internalType: 'uint256', name: 'tonnes', type: 'uint256' },
      { internalType: 'uint256', name: 'price', type: 'uint256' },
      { internalType: 'bool', name: 'isLiquidSwap', type: 'bool' },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'currentMidnightIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountUsedForSwapQuote',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountedForwardBalanceForCurrentMidnightIndex',
            type: 'uint256',
          },
        ],
        internalType:
          'struct IQuoterRouterFacet.DiscountedForwardBalanceContext',
        name: 'discountedForwardBalanceContext',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export default abi;
