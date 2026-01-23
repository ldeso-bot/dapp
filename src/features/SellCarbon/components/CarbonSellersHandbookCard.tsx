'use client';

import Card from '@/shared/components/Card/Card';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { MenuBookIcon } from '@/shared/components/Svg/MenuBookIcon';
import { OpenInNewIcon } from '@/shared/components/Svg/OpenInNewIcon';
import { CARBON_SELLERS_HANDBOOK_URL } from '@/shared/constants/urls.constants';

export const CarbonSellersHandbookCard = () => {
  return (
    <LinkOpenInNew
      href={CARBON_SELLERS_HANDBOOK_URL}
      className="hover:no-underline"
      withoutIcon
    >
      <Card className="w-[50rem] rounded-xl border border-gray-200">
        <div className="flex flex-row gap-3 items-center justify-between">
          <span className="flex flex-row gap-3 items-center">
            <span>
              <div className="w-10 h-10 rounded-lg bg-green-20 flex items-center justify-center">
                <MenuBookIcon className="w-4 h-4 text-green-80" />
              </div>
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-size-16 font-semibold text-gray-800 text-nowrap">
                Carbon Sellers Handbook
              </span>
              <span className="text-size-12">
                Whitelisting, pricing, and the selling process
              </span>
            </span>
          </span>
          <OpenInNewIcon className="w-4 h-4 text-green-80" />
        </div>
      </Card>
    </LinkOpenInNew>
  );
};
