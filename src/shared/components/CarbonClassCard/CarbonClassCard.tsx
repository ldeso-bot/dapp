'use client';

import Card from '@/shared/components/Card/Card';
import {
  useExecutionRates,
} from '@/shared/hooks/api/useExecutionRates';
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
  const { data: quotes } = useExecutionRates(quoteType);

  const quotesMap = new Map(quotes?.map((q) => [q.carbonClassId, q]) ?? []);

  return (
    <div>
      <Card
        title="Carbon Class Execution Rates"
        tooltip="Execution rates are indicative only and may change at the time of execution due to protocol and network conditions. Any USD references are illustrative and provided for convenience."
        className="w-full max-w-full lg:w-[50rem] rounded-xl border border-gray-200"
        titleClassName="font-semibold text-void-800 text-size-20 tracking-tight"
        skeletonClassName="h-[20rem]"
      >
        {!isLoading && (
          <div className="pt-2">
            {data?.carbonClasses.map((item, index) => {
              const quote = quotesMap.get(item.carbonClassId);
              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <div className="font-base text-void-80 text-size-14">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-size-14 text-void-80">
                        {formatPriceUSDWithCommas(quote?.usdcPerTonne, 'auto')}
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
