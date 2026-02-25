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
      <div className="p-5 bg-background rounded-xl border border-gray-200 hover:border-green-60 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-10 flex items-center justify-center group-hover:bg-green-20 transition-colors shrink-0">
            <InfoIcon className="w-5 h-5 text-green-80" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold tracking-tight text-void-80 group-hover:text-green-80 transition-colors text-size-16">
              Regen Network credits
            </h3>
            <p className="text-size-14 text-void-50 mt-0.5">
              Retirements are bridged through Regen Network. To learn more see
              the documentation.
            </p>
          </div>
          <OpenInNewIcon className="w-4.5 h-4.5 text-void-40 group-hover:text-green-80 transition-colors shrink-0" />
        </div>
      </div>
    </a>
  );
};
