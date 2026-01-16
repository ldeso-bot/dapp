export const calculatePercentage = (value: number, total: number) =>
  total > 0 ? (value / total) * 100 : 0;

export const applySlippage = (amount: bigint, slippage: number): bigint => {
  const TENEXP6 = 10 ** 6;
  const slippageEffect6Decimals = BigInt(Math.floor((1 - slippage) * TENEXP6));
  return (amount * slippageEffect6Decimals) / BigInt(TENEXP6);
};
