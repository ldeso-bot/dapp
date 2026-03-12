'use client';

import Card from '@/shared/components/Card/Card';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';

export enum QuoteType {
  swap = 'swap',
  retire = 'retire',
}

type Props = {
  quoteType: QuoteType;
};

export default function CarbonClassCard({ quoteType }: Props) {
  const { data, isLoading } = useProtocolData();

  return (
    <div>
      <Card
        title="Carbon Class Execution Rates"
        tooltip="Execution rates are indicative only and may change at the time of execution due to protocol and network conditions. Any USD references are illustrative and provided for convenience."
        className="w-full text-text-1 max-w-full lg:w-[50rem] rounded-xl border border-border-subtle"
        titleClassName="font-semibold text-text-1 text-size-20 tracking-tight"
        skeletonClassName="h-[20rem]"
      >
        {!isLoading && (
          <div className="pt-2">
            {data?.carbonClasses.map((item, index) => {
              const price =
                quoteType === QuoteType.retire
                  ? item.retirementPriceUsdPerTonne
                  : item.swapPriceUsdPerTonne;
              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <div className="font-base text-text-1 text-size-14">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-size-14 text-text-1">
                        {formatPriceUSDWithCommas(price, 'auto')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
