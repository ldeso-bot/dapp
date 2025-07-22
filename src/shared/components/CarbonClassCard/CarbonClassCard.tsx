'use client';

import Card from '@/shared/components/Card/Card';
import ChangePercent from '@/shared/components/ChangePercent/ChangePercent';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import clsx from 'clsx';

export default function CarbonClassCard() {
  const { data } = useProtocolData();
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  return (
    <div>
      <Card
        title="Carbon Class Prices"
        className="w-[36rem] border-0 rounded-xl"
        titleClassName="font-bold text-void-80 text-size-18">
        <div className="pt-2">
          {data?.carbonMarket.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="font-base text-void-80 text-size-14">
                    {item.category}
                  </div>
                </div>
                {/* todo - move out to a shared price badge component??? */}
                <div className="flex items-center gap-4">
                  <div className="text-size-14 text-void-80">
                    {formatPrice(item.priceUSD)}
                  </div>
                  <div className={clsx('flex items-center gap-1.5 px-2 py-0 rounded-full text-size-12', {
                    'text-void-80 bg-void-10': item.changeUSD === 0,
                    'text-green-80 bg-green-10': item.changeUSD > 0,
                    'text-red-600 bg-red-100': item.changeUSD < 0
                  })}>
                    <ChangePercent value={item.changeUSD / 100} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}