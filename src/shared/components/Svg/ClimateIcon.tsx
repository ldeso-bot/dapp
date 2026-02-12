'use client';

type Props = {
  className?: string;
};

export const ClimateIcon = ({ className }: Props) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21z" />
  </svg>
);
