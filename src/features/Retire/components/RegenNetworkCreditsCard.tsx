'use client';

import { InfoIcon } from '@/shared/components/Svg/InfoIcon';
import { OpenInNewIcon } from '@/shared/components/Svg/OpenInNewIcon';
import { getCarbonClassInfo } from '@/shared/constants/carbonClasses.constants';
import { REGEN_NETWORK_DOCS_URL } from '@/shared/constants/urls.constants';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { FC } from 'react';

type Props = {
  selectedCarbonClassId: string;
};

export const RegenNetworkCreditsCard: FC<Props> = (props) => {
  const { selectedCarbonClassId } = props;
  const chainId = useChainId();

  const { isRegen = false } =
    getCarbonClassInfo(chainId, selectedCarbonClassId) ?? {};

  if (!isRegen) {
    return null;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={REGEN_NETWORK_DOCS_URL}
      className="block group min-w-0 w-full max-w-full lg:w-[50rem]"
    >
      <div className="p-5 bg-surface-1 rounded-xl border border-border-subtle transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-icon-bg flex items-center justify-center shrink-0">
            <InfoIcon className="w-4 h-4 text-text-highlight" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-size-16 font-semibold text-text-1 whitespace-normal">
                Regen Network credits
              </span>
              <OpenInNewIcon className="w-4 h-4 text-text-highlight shrink-0" />
            </div>

            <span className="text-size-12 text-text-2">
              Retirements are bridged through Regen Network. To learn more see
              the documentation.
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
