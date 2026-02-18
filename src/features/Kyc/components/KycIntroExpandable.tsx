'use client';

import { type ReactNode } from 'react';

type Props = {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export const KycIntroExpandable = ({
  label,
  expanded,
  onToggle,
  children,
}: Props) => (
  <>
    <button
      type="button"
      className="text-size-14 mt-1 flex items-center gap-1.5 min-h-[40px] hover:opacity-80 transition-opacity text-green-600"
      onClick={onToggle}
      aria-expanded={expanded}
    >
      {label} {expanded ? '▾' : '▸'}
    </button>
    {expanded && (
      <p className="text-size-14 text-gray-700 mt-2 mt-3 pl-4 border-l-2 space-y-1.5 text-sm border-green-300">
        {children}
      </p>
    )}
  </>
);
