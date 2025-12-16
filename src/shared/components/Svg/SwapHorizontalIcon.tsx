'use client';

type Props = {
  className?: string;
};

export const SwapHorizontalIcon = ({ className }: Props) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6.99 11 3 15l3.99 4v-3H14v-2H6.99zM21 9l-3.99-4v3H10v2h7.01v3z" />
  </svg>
);
