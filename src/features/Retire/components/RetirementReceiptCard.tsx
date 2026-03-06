'use client';

import { DocIcon } from '@/shared/components/Svg/DocIcon';
import { OpenInNewIcon } from '@/shared/components/Svg/OpenInNewIcon';

type Props = { receiptUrl: string };

export const RetirementReceiptCard = ({ receiptUrl }: Props) => (
  <a
    href={receiptUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block hover:no-underline shrink-0 lg:w-80"
  >
    <div className="bg-white rounded-xl border border-green-20 hover:border-green-40 transition-colors p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-green-20 flex items-center justify-center shrink-0">
          <DocIcon className="w-4 h-4 text-green-80" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-size-14 font-semibold text-gray-800 whitespace-nowrap">
            View your retirement receipt
          </span>
          <OpenInNewIcon className="w-4 h-4 text-green-80 shrink-0" />
        </div>
      </div>
      <div className="flex items-center gap-2 pl-1">
        <span className="text-size-12 text-gray-500 whitespace-nowrap">
          Powered by
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/carbonmark-logo.svg"
          alt="Carbonmark"
          className="h-10"
        />
      </div>
    </div>
  </a>
);
