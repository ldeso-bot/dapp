import { CarbonClass } from '@/shared/models/ProtocolData';
import { unique } from 'remeda';
import { useProtocolData } from '../api/useProtocolData';

type CategoryInfo = {
  name: string;
  carbonClasses: CarbonClass[];
};

/**
 * Extracts the categories from the carbon classes
 * @returns
 */
export const useCarbonCategories = () => {
  const { data, ...rest } = useProtocolData();
  const categories: CategoryInfo[] = unique(
    data?.carbonClasses.map((c) => c.category) ?? []
  ).map((c) => ({
    name: c,
    carbonClasses: data?.carbonClasses.filter((cc) => cc.category === c) ?? [],
  }));

  return { categories, ...rest };
};
