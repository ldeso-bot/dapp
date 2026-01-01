import { CarbonClass } from '@/shared/models/shared';
import { unique } from 'remeda';
import { useProtocolData } from '../api/useProtocolData';

type CategoryInfo = {
  name: string;
  carbonClasses: CarbonClass[];
};

/**
 * Extracts the categories and select input items from the carbon classes
 * @returns
 */
export const useCarbonClasses = () => {
  const { data, ...rest } = useProtocolData();
  const categories: CategoryInfo[] = unique(
    data?.carbonClasses.map((c) => c.category) ?? []
  ).map((c) => ({
    name: c,
    carbonClasses: data?.carbonClasses.filter((cc) => cc.category === c) ?? [],
  }));

  const selectInputItems =
    data?.carbonClasses.map((c) => ({
      value: c.name,
      label: c.name,
    })) || [];
  return { categories, selectInputItems, ...rest };
};
