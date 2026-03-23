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
      noWrap={false}
    >
      <Card className="min-w-0 w-full max-w-full lg:w-[50rem] rounded-xl border border-border-subtle h-fit">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-icon-bg flex items-center justify-center shrink-0">
              <ClockIcon className="w-4 h-4 text-text-highlight" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-size-16 font-semibold text-text-1 whitespace-normal">
                  Retirement History [t129]
                </span>
                <OpenInNewIcon className="w-4 h-4 text-text-highlight shrink-0" />
              </div>
              <span className="text-size-12 text-text-2">
                View retirements attributed to this wallet on Carbonmark [t130]
              </span>
            </div>
          </div>
        </div>
      </Card>
    </LinkOpenInNew>
  );
};
