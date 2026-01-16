'use client';

import Card from '@/shared/components/Card/Card';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { AlertIcon } from '@/shared/components/Svg/AlertIcon';
import {
  CARBON_SELLERS_HANDBOOK_URL,
  DISCORD_URL,
} from '@/shared/constants/urls.constants';

export const SellCarbonGettingStarted = () => {
  return (
    <Card variant="info">
      <div className="flex flex-row gap-3 items-center justify-between">
        <span className="flex flex-row gap-3 items-center">
          <span>
            <div className="w-10 h-10 rounded-lg bg-green-20 flex items-center justify-center">
              <AlertIcon className="w-4 h-4" />
            </div>
          </span>
          <span className="text-size-16 font-semibold text-gray-800 text-nowrap">
            Getting Started
          </span>
        </span>
        <span className="text-size-14 text-gray-600">
          Only whitelisted carbon credits are currently supported. Credits must
          be tokenized and present in your wallet.
        </span>
        <span className="flex flex-row gap-3 items-center">
          <LinkOpenInNew href={DISCORD_URL}>
            <span className="text-size-14">Discord</span>
          </LinkOpenInNew>
          <LinkOpenInNew href={CARBON_SELLERS_HANDBOOK_URL}>
            <span className="text-size-14">Sellers Handbook</span>
          </LinkOpenInNew>
        </span>
      </div>
    </Card>
  );
};
