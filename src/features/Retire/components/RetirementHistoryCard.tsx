'use client';

import Card from '@/shared/components/Card/Card';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { ClockIcon } from '@/shared/components/Svg/ClockIcon';
import { OpenInNewIcon } from '@/shared/components/Svg/OpenInNewIcon';

type Props = {
  retirementHistoryUrl: string;
};

export const RetirementHistoryCard = ({ retirementHistoryUrl }: Props) => {
  return (
    <LinkOpenInNew
      href={retirementHistoryUrl}
      className="hover:no-underline block"
      withoutIcon
    >
      <Card className="min-w-0 w-full max-w-full lg:w-[50rem] rounded-xl border border-gray-200 h-fit">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-green-20 flex items-center justify-center shrink-0">
              <ClockIcon className="w-4 h-4 text-green-80" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-size-16 font-semibold text-gray-800 whitespace-normal">
                  Retirement History
                </span>
                <OpenInNewIcon className="w-4 h-4 text-green-80 shrink-0" />
              </div>
              <span className="text-size-12 text-gray-600">
                View retirements attributed to this wallet on Carbonmark
              </span>
            </div>
          </div>
        </div>
      </Card>
    </LinkOpenInNew>
  );
};
