const abi = [
  {
    type: 'function',
    name: 'quoteRetireCreditViaKlima',
    inputs: [
      { name: 'creditToken', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'inputTokenAddress', type: 'address', internalType: 'address' },
      { name: 'carbonClass', type: 'address', internalType: 'address' },
      { name: 'couponTonnes', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'tonnes', type: 'uint256', internalType: 'uint256' },
      { name: 'kvcmRetirementPrice', type: 'uint256', internalType: 'uint256' },
      {
        name: 'discountedForwardBalanceContext',
        type: 'tuple',
        internalType: 'struct IKlimaProtocol.DiscountedForwardBalanceContext',
        components: [
          {
            name: 'currentMidnightIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountUsedForSwapQuote',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'discountedForwardBalanceForCurrentMidnightIndex',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'updateLiquidSupplyRateLimiterParams',
        type: 'tuple',
        internalType:
          'struct IKlimaProtocol.UpdateLiquidSupplyRateLimiterParams',
        components: [
          {
            name: 'preTxnLiquidSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'retireCredit',
    inputs: [
      { name: 'creditToken', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'batchId', type: 'uint256', internalType: 'uint256' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      {
        name: 'details',
        type: 'tuple',
        internalType: 'struct LibRetire.RetireDetails',
        components: [
          { name: 'retiringAddress', type: 'address', internalType: 'address' },
          {
            name: 'retiringEntityString',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'beneficiaryAddress',
            type: 'address',
            internalType: 'address',
          },
          { name: 'beneficiaryString', type: 'string', internalType: 'string' },
          { name: 'retirementMessage', type: 'string', internalType: 'string' },
          {
            name: 'beneficiaryLocation',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'consumptionCountryCode',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'consumptionPeriodStart',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'consumptionPeriodEnd',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'retireCreditViaKlima',
    inputs: [
      { name: 'creditToken', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'batchId', type: 'uint256', internalType: 'uint256' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'inputTokenAddress', type: 'address', internalType: 'address' },
      { name: 'carbonClass', type: 'address', internalType: 'address' },
      { name: 'maxInputTokenIn', type: 'uint256', internalType: 'uint256' },
      { name: 'couponTonnes', type: 'uint256', internalType: 'uint256' },
      {
        name: 'details',
        type: 'tuple',
        internalType: 'struct LibRetire.RetireDetails',
        components: [
          { name: 'retiringAddress', type: 'address', internalType: 'address' },
          {
            name: 'retiringEntityString',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'beneficiaryAddress',
            type: 'address',
            internalType: 'address',
          },
          { name: 'beneficiaryString', type: 'string', internalType: 'string' },
          { name: 'retirementMessage', type: 'string', internalType: 'string' },
          {
            name: 'beneficiaryLocation',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'consumptionCountryCode',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'consumptionPeriodStart',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'consumptionPeriodEnd',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AggregatorRetired',
    inputs: [
      {
        name: 'carbonBridge',
        type: 'uint8',
        indexed: false,
        internalType: 'enum LibRetire.CarbonBridge',
      },
      {
        name: 'retiringAddress',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'retiringEntityString',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'beneficiaryAddress',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'beneficiaryString',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'retirementMessage',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'carbonToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'batchId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'hasId',
        type: 'uint8',
        indexed: false,
        internalType: 'enum IRetirementEvents.HasId',
      },
      {
        name: 'retiredAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'InvalidAmountReceived', inputs: [] },
  { type: 'error', name: 'InvalidAmout', inputs: [] },
  { type: 'error', name: 'InvalidBeneficiaryLocation', inputs: [] },
  { type: 'error', name: 'InvalidCountryCode', inputs: [] },
  { type: 'error', name: 'InvalidPeriodEnd', inputs: [] },
  { type: 'error', name: 'InvalidPeriodStart', inputs: [] },
  { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] },
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'TokenNotSupported', inputs: [] },
] as const;

export default abi;
