'use client';

import Button from '@/shared/components/Button/Button';
import { CloseIcon } from '@/shared/components/Svg/CloseIcon';

type Props = { onClose: () => void };

export const KycIntroHeader = ({ onClose }: Props) => (
  <div className="px-6 py-4 border-b border-border-subtle sticky top-0 bg-surface-1 z-10">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-2">
        <h3 id="kyc-title" className="text-size-18 font-semibold text-text-1">
          KYC with zkMe
        </h3>
        <p
          id="kyc-subhead"
          className="text-size-14 leading-relaxed text-text-2 mt-2"
          tabIndex={-1}
        >
          We verify your identity with zkMe. Here&apos;s what we access—and what
          we don&apos;t.
        </p>
        <p className="text-size-12 text-text-3 mt-1">
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
        <CloseIcon className="w-5 h-5 text-text-1" />
      </Button>
    </div>
  </div>
);
