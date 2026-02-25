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
      className="hover:no-underline block"
      withoutIcon
    >
      <Card className="min-w-0 w-full max-w-full lg:w-[50rem] rounded-xl border border-gray-200 h-fit">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-green-20 flex items-center justify-center shrink-0">
              <MenuBookIcon className="w-4 h-4 text-green-80" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-size-16 font-semibold text-gray-800 whitespace-normal">
                  Carbon Suppliers Handbook
                </span>
                <OpenInNewIcon className="w-4 h-4 text-green-80 shrink-0" />
              </div>
              <span className="text-size-12 text-gray-600">
                Whitelisting, pricing, and the supplying process
              </span>
            </div>
          </div>
        </div>
      </Card>
    </LinkOpenInNew>
  );
};
