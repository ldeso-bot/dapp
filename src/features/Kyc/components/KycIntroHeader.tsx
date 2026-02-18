'use client';

import Button from '@/shared/components/Button/Button';
import { CloseIcon } from '@/shared/components/Svg/CloseIcon';

type Props = { onClose: () => void };

export const KycIntroHeader = ({ onClose }: Props) => (
  <div className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-2">
        <h3
          id="kyc-title"
          className="text-size-18 font-semibold text-gray-900"
        >
          KYC with zkMe
        </h3>
        <p
          id="kyc-subhead"
          className="text-size-14 leading-relaxed text-gray-700 mt-2"
          tabIndex={-1}
        >
          We verify your identity with zkMe. Here&apos;s what we access—and
          what we don&apos;t.
        </p>
        <p className="text-size-12 text-gray-500 mt-1">
          Controller: <strong>Klima Fintech Ltd.</strong> • Processor:{' '}
          <strong>zkMe</strong>
        </p>
      </div>
      <Button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="shrink-0 p-1 min-w-0 border-0 bg-transparent hover:opacity-80"
      >
        <CloseIcon className="w-5 h-5 text-gray-800" />
      </Button>
    </div>
  </div>
);
