'use client';

import { cn } from '@/shared/utils/component.utils';
import { type FC } from 'react';
import { CategoryFilterButton } from './CategoryFilterButton';

type Props = {
  className?: string;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export const CategoryFilter: FC<Props> = (props) => {
  const { categories, selectedCategory, onCategoryChange, className } = props;

  return (
    <div className={cn('flex flex-wrap gap-2 mb-4', className)}>
      <CategoryFilterButton
        label="All"
        isActive={selectedCategory === null}
        onClick={() => onCategoryChange(null)}
      />
      {categories.map((category) => (
        <CategoryFilterButton
          key={category}
          label={category}
          isActive={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
        />
      ))}
    </div>
  );
};
