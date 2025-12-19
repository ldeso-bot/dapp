'use client';

import { cn } from '@/shared/utils/component.utils';
import type { CtaConfig } from '@/shared/utils/emptyState.utils';
import Button from '../Button/Button';
import { ArrowForwardIcon } from '../Svg/ArrowForwardIcon';

export const EmptyStateButton = ({ cta }: { cta: CtaConfig }) => {
  const CtaIcon = cta.icon;
  return (
    <>
      <div className="transition-all duration-200">
        <Button
          onClick={cta.onClick}
          className={cn(
            'h-14 px-6 gap-3 hover:scale-105 transition-transform bg-foreground text-white',
            cta.className
          )}
        >
          <CtaIcon className="w-5 h-5" />
          <span className="text-size-16">{cta.text}</span>
          <ArrowForwardIcon className="w-4 h-4" />
        </Button>
      </div>
      {cta.description && (
        <p className="text-size-14 text-gray-600 text-center">
          {cta.description}
        </p>
      )}
    </>
  );
};
