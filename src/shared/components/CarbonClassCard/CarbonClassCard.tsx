'use client';

import Card from '@/shared/components/Card/Card';
import ChangePercent from '@/shared/components/ChangePercent/ChangePercent';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import clsx from 'clsx';

export default function CarbonClassCard() {
  const { data, isLoading } = useProtocolData();
  return (
    <div>
      <Card
        title="Carbon Class Execution Rates"
        tooltip="Execution rates are indicative only and may change at the time of execution due to protocol and network conditions. Any USD references are illustrative and provided for convenience."
        className="w-[50rem] rounded-xl border border-gray-200"
        titleClassName="font-semibold text-void-800 text-size-20 tracking-tight"
        skeletonClassName="h-[20rem]"
      >
        {!isLoading && (
          <>
            <div className="pt-2">
              {data?.carbonClasses.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <div className="font-base text-void-80 text-size-14">
                        {item.name}
                      </div>
                    </div>
                    {/* todo - move out to a shared price badge component??? */}
                    <div className="flex items-center gap-4">
                      <div className="text-size-14 text-void-80">
                        {formatPriceUSDWithCommas(item.valueUSD, 'auto')}
                      </div>
                      <div
                        className={clsx(
                          'flex items-center gap-1.5 px-2 py-0 rounded-full text-size-12',
                          {
                            'text-void-80 bg-void-10':
                              item.valueUSDChangePercent24h === 0,
                            'text-green-80 bg-green-10':
                              item.valueUSDChangePercent24h > 0,
                            'text-red-60 bg-red-10':
                              item.valueUSDChangePercent24h < 0,
                          }
                        )}
                      >
                        <ChangePercent value={item.valueUSDChangePercent24h} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
