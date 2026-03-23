'use client';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const KycIntroAcknowledgment = ({ checked, onChange }: Props) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border bg-surface-2 border-border-subtle">
    <input
      id="kyc-acknowledged"
      className="mt-0.5 w-4 h-4 border border-border-subtle rounded shrink-0 accent-green-600 cursor-pointer"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label
      htmlFor="kyc-acknowledged"
      className="text-size-14 leading-relaxed cursor-pointer text-text-2"
    >
      I&apos;ve read and understand how Klima Fintech Ltd. uses verification
      results to grant access. [t406]
    </label>
  </div>
);
