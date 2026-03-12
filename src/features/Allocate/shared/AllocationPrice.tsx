'use client';

import { useCarbonClass } from '@/features/Allocate/hooks/useCarbonClass';
import {
  formatPriceUSDWithCommas,
  formatUTCTime,
} from '@/shared/utils/string.utils';
import { type FC, useMemo } from 'react';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationPrice: FC<AllocationsTableItemProps> = (props) => {
  const { allocation, tokenInfo } = props;
  const carbonClass = useCarbonClass(allocation);

  const isKvcm = tokenInfo.id === 'kvcm';

  const priceDisplay = useMemo(() => {
    if (!isKvcm) {
      return <AllocationPriceEffect {...props} />;
    }

    const hasPrice = carbonClass
      ? carbonClass.retirementPriceUsdPerTonne > 0
      : false;
    const hasInventory = carbonClass ? carbonClass.supplyTonnes > 0 : false;

    if (!hasPrice) {
      return <div className="text-text-3 text-size-14">Not priced</div>;
    }

    if (!hasInventory || !carbonClass) {
      return <div className="text-text-3 text-size-14">No inventory</div>;
    }

    return (
      <div className="flex flex-col">
        <div className="font-medium text-text-1 text-size-14">
          {formatPriceUSDWithCommas(
            carbonClass.retirementPriceUsdPerTonne,
            'auto'
          )}
        </div>
        <div className="text-size-12 text-void-50">
          updated {formatUTCTime()}
        </div>
      </div>
    );
  }, [carbonClass, isKvcm, props]);

  return priceDisplay;
};
