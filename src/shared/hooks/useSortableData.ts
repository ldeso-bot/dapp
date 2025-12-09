import { useMemo, useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;

export type SortConfig<TData> = {
  key: keyof TData | null;
  direction: SortDirection;
};

type SortOptions<TData> = {
  customComparators?: Partial<
    Record<
      keyof TData,
      (a: TData, b: TData, direction: 'asc' | 'desc') => number
    >
  >;
};

export function useSortableData<TData>(
  data: TData[] | undefined,
  options?: SortOptions<TData>
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<TData>>({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!data) return undefined;
    if (!sortConfig.key || !sortConfig.direction) return data;

    const sorted = [...data].sort((a, b) => {
      const key = sortConfig.key!;

      if (options?.customComparators?.[key]) {
        return options.customComparators[key]!(a, b, sortConfig.direction!);
      }

      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [data, sortConfig, options]);

  const requestSort = (key: keyof TData) => {
    let direction: SortDirection = 'asc';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  return { sortedData, sortConfig, requestSort };
}
