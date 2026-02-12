'use client';

type Props = {
  className?: string;
};

export const DashboardIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z" />
    </svg>
  );
};
