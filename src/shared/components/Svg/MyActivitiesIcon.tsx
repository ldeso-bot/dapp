'use client';

type Props = {
  className?: string;
};

export const MyActivitiesIcon = ({ className }: Props) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z" />
  </svg>
);
