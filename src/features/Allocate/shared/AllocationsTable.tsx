import Card from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { useSortableData } from '@/shared/hooks/useSortableData';
import filterDark from '@/shared/images/filter-dark.svg';
import filterLight from '@/shared/images/filter-light.svg';
import { Allocation } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import { type FC, useMemo, useState } from 'react';
import { AllocationsCardProps } from './AllocationsTable.types';
import { AllocationsTableDesktop } from './AllocationsTableDesktop';
import { AllocationsTableMobile } from './AllocationsTableMobile';
import { CategoryFilter } from './CategoryFilter';

export const AllocationsTable: FC<AllocationsCardProps> = (props) => {
  const {
    className,
    data,
    tokenInfo,
    showCategoryFilter = false,
    ready,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isKvcm = tokenInfo.id === 'kvcm';

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
          const priceEffectOrder = { High: 3, Medium: 2, Low: 1 } as const;
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
      className={cn('rounded-lg border-border-default !shadow-none', className)}
    >
      {ready && (
        <>
          <p className="text-size-14 text-text-2 mt-1">
            {isKvcm
              ? `Allocate kVCM to carbon classes to direct which credits the protocol
          buys and holds in the portfolio, and at what intensity. Higher
          allocations increase your share of flows in that class and influence
          its indicative price.`
              : `Allocate K2 to carbon classes to increase the system’s capacity to buy and retire those credits without moving the price. K2 does not represent direct ownership of carbon; it shapes how much activity the system can support at a given price.`}
          </p>

          <div className="pt-2">
            {showCategoryFilter && categories.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="dark:hidden">
                  <Icon size={1.8} alt="Filter" icon={filterLight} />
                </span>

                <span className="hidden dark:inline-flex">
                  <Icon size={1.8} alt="Filter" icon={filterDark} />
                </span>

                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
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
        </>
      )}
    </Card>
  );
};
