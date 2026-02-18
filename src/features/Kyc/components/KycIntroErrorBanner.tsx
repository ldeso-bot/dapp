'use client';

import { CloseIcon } from '@/shared/components/Svg/CloseIcon';

type Props = {
  message: string;
  onDismiss?: () => void;
};

export const KycIntroErrorBanner = ({ message, onDismiss }: Props) => (
  <div
    className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-900"
    role="alert"
  >
    <p className="text-size-14 flex-1">{message}</p>
    {onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="shrink-0 p-1 rounded hover:bg-amber-100"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    )}
  </div>
);
