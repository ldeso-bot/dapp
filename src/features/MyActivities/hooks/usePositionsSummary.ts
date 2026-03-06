import { useHoldingsData } from './useHoldingsData';

export const usePositionsSummary = () => {
  const { data: holdingsData } = useHoldingsData();

  const totalActions = holdingsData
    ? +!!holdingsData.kvcm.maturedLocks.length +
      +!!holdingsData.liquidityMaturedLocks.length +
      +!!holdingsData.k2.maturedLocks.length
    : 0;

  const claimableValue = holdingsData?.claimableValue ?? 0;

  return {
    totalActions,
    claimableValue,
    holdingsData,
  };
};
