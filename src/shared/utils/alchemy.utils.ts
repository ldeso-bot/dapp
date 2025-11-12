type AlchemyPriceItem = {
  currency: string;
  value: string;
  lastUpdatedAt: string;
};

type AlchemyTokenPrice = {
  symbol: string;
  prices: AlchemyPriceItem[];
};

type AlchemyPriceResponse = {
  data: AlchemyTokenPrice[];
};

/**
 * Fetches token prices using Alchemy Price API
 * @returns Token prices or array of null values if the API call fails
 */
export const getTokenPricesViaAlchemy = async (
  symbols: string[]
): Promise<(number | null)[]> => {
  const apiKey = process.env.ALCHEMY_API_KEY;

  if (!apiKey) {
    throw new Error('ALCHEMY_API_KEY is not set');
  }

  try {
    // Fetch prices
    const response = await fetch(
      'https://api.g.alchemy.com/prices/v1/tokens/by-symbol?symbols=AERO',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch prices: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as AlchemyPriceResponse;

    // Map symbol to prices
    return symbols.map((symbol) => {
      const prices = data.data.find((p) => p.symbol === symbol);
      if (!prices) {
        return null;
      }
      const usdPrice = prices.prices.find(
        (p) => p.currency.toLowerCase() === 'usd'
      );
      return usdPrice ? parseFloat(usdPrice.value) : null;
    });
  } catch (error: unknown) {
    console.error('Error fetching prices:', error);
    return symbols.map(() => null);
  }
};
