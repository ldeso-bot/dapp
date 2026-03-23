'use client';

import Card from '@/shared/components/Card/Card';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { AlertIcon } from '@/shared/components/Svg/AlertIcon';
import { CARBON_SELLERS_HANDBOOK_URL } from '@/shared/constants/urls.constants';

export const SellCarbonGettingStarted = () => {
  return (
    <Card variant="info" className="bg-positive-bg">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-icon-bg flex items-center justify-center shrink-0">
            <AlertIcon className="w-4 h-4" />
          </div>
          <div className="text-size-16 font-semibold text-text-1 whitespace-normal">
            Getting Started [t189]
          </div>
        </div>
        <div className="text-size-14 text-text-1 min-w-0">
          Only whitelisted carbon credits are currently supported. Credits must
          be tokenized and present in your wallet. [t190]
        </div>
        <div className="flex lg:justify-end">
          <LinkOpenInNew href={CARBON_SELLERS_HANDBOOK_URL}>
            <span className="text-size-14 font-medium  text-text-2">
              Suppliers Handbook [t191]
            </span>
          </LinkOpenInNew>
        </div>
      </div>
    </Card>
  );
};
