export const getMetrics = async () => {
  return {
    klima: {
      priceUSD: 1.32,
      priceChangePercentage24h: 0.12,
      totalSupplyTonnes: 100,
    },
  };
};

export type Metrics = Awaited<ReturnType<typeof getMetrics>>;
