'use client';

import Card from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import clsx from 'clsx';
import negativeArrowIcon from '../../images/negative-arrow.svg';
import neutralArrowIcon from '../../images/neutral-arrow.svg';
import positiveArrowIcon from '../../images/positive-arrow.svg';
import { carbonPrices } from '../../retire.constants';

export default function CarbonPriceCard() {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getArrowIcon = (changeUSD: number) => {
    // todo - use svgr to convert svg's to react components
    if (changeUSD > 0) {
      return positiveArrowIcon;
    } else if (changeUSD < 0) {
      return negativeArrowIcon;
    } else {
      return neutralArrowIcon;
    }
  }

  return (
    <div>
      <Card
        title="Carbon Class Prices"
        className="w-[36rem]"
        titleClassName="text-size-18 font-bold text-void-80">
        <div className="pt-2">
          {carbonPrices.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="text-size-14 font-base text-void-80">
                    {item.category} - {item.type}
                  </div>
                </div>
                {/* todo - move out to a shared price badge component??? */}
                <div className="flex items-center gap-4">
                  <div className="text-size-14 text-void-80">
                    {formatPrice(item.priceUSD)}
                  </div>
                  <div className={clsx('flex items-center gap-1.5 px-2 py-1 rounded-full text-size-12', {
                    'text-void-80 bg-void-10': item.changeUSD === 0,
                    'text-green-80 bg-green-10': item.changeUSD > 0,
                    'text-red-600 bg-red-100': item.changeUSD < 0
                  })}>
                    <Icon
                      size={12}
                      icon={getArrowIcon(item.changeUSD)}
                    />
                    {Math.abs(item.changeUSD).toFixed(1)}%
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