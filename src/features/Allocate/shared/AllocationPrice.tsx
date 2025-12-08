'use client';

import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSD, formatUTCTime } from '@/shared/utils/string.utils';
import { type FC, useMemo } from 'react';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationPrice: FC<AllocationsTableItemProps> = (props) => {
  const { allocation, tokenInfo } = props;
  const { data: protocolData } = useProtocolData();

  const isKvcm = tokenInfo.id === 'kvcm';

  const priceDisplay = useMemo(() => {
    if (!isKvcm) {
      return <AllocationPriceEffect {...props} />;
    }

    const carbonClass = protocolData?.carbonClasses?.find(
      (cc) => cc.name === allocation.carbonClass
    );

    const hasPrice = allocation.priceUSD > 0;
    const hasInventory = carbonClass ? carbonClass.supplyTonnes > 0 : false;

    if (!hasPrice) {
      return <div className="text-void-50 text-size-14">Not priced</div>;
    }

    if (!hasInventory) {
      return <div className="text-void-50 text-size-14">No inventory</div>;
    }

    return (
      <div className="flex flex-col">
        <div className="font-bold">{formatPriceUSD(allocation.priceUSD)}</div>
        <div className="text-size-12 text-void-50">
          updated {formatUTCTime()}
        </div>
      </div>
    );
  }, [allocation, protocolData, isKvcm, props]);

  return priceDisplay;
};
