export type BondYieldRate = {
  day: number;
  yield: number;
};

// TODO: Replace with actual API call
export const getKlimaBondYieldRates = async (): Promise<BondYieldRate[]> => {
  // This is sample data - replace with actual API call
  return [
    { day: 1, yield: 5.2 },
    { day: 2, yield: 5.5 },
    { day: 3, yield: 5.8 },
    { day: 4, yield: 6.1 },
    { day: 5, yield: 6.3 },
    { day: 6, yield: 6.5 },
    { day: 7, yield: 6.7 },
  ];
};
