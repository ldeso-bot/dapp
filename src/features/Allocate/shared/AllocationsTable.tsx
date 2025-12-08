import Card from '@/shared/components/Card/Card';
import { useSortableData } from '@/shared/hooks/useSortableData';
import { Allocation } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import { type FC, useMemo, useState } from 'react';
import { AllocationsCardProps } from './AllocationsTable.types';
import { AllocationsTableDesktop } from './AllocationsTableDesktop';
import { AllocationsTableMobile } from './AllocationsTableMobile';
import { CategoryFilter } from './CategoryFilter';

export const AllocationsTable: FC<AllocationsCardProps> = (props) => {
  const { className, data, showCategoryFilter = false } = props;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!showCategoryFilter) return [];
    const uniqueCategories = Array.from(
      new Set(data?.map((allocation) => allocation.category))
    );
    return uniqueCategories.sort();
  }, [data, showCategoryFilter]);

  const filteredData = useMemo(() => {
    if (!selectedCategory) return data;
    return data?.filter(
      (allocation) => allocation.category === selectedCategory
    );
  }, [data, selectedCategory]);

  const { sortedData, sortConfig, requestSort } = useSortableData<Allocation>(
    filteredData,
    {
      customComparators: {
        token: (a, b, direction) => {
          const aToken = a.token.name;
          const bToken = b.token.name;
          return direction === 'asc'
            ? aToken.localeCompare(bToken)
            : bToken.localeCompare(aToken);
        },
        priceEffect: (a, b, direction) => {
          const priceEffectOrder = { High: 3, Medium: 2, Low: 1 };
          const aValue = priceEffectOrder[a.priceEffect];
          const bValue = priceEffectOrder[b.priceEffect];
          return direction === 'asc' ? bValue - aValue : aValue - bValue;
        },
      },
    }
  );

  if (!data) return null;

  return (
    <Card
      {...props}
      skeletonClassName="h-50"
      className={cn('rounded-lg border-gray-300 !shadow-none', className)}
    >
      <div className="pt-2">
        {showCategoryFilter && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
        <AllocationsTableDesktop
          {...props}
          data={sortedData}
          sortConfig={sortConfig}
          onSort={requestSort}
          className="hidden lg:table"
        />
        <AllocationsTableMobile
          {...props}
          data={sortedData}
          className="lg:hidden"
        />
      </div>
    </Card>
  );
};
