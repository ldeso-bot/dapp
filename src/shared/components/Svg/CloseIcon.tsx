'use client';

type Props = {
  className?: string;
};

export const CloseIcon = ({ className }: Props) => (
  <svg
    fill="none"
    focusable="false"
    className={className}
    aria-hidden="true"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
