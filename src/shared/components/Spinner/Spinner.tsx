'use client';

import { cn } from '@/shared/utils/component.utils';

export type SpinnerColor = 'primary' | 'white' | 'green';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: SpinnerColor;
};

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

export default function Spinner({
  size = 'md',
  className,
  color = 'primary',
}: SpinnerProps) {
  const borderColorMap = {
    primary: '#1e1e1e', // void-80
    white: '#ffffff',
    green: '#00cc33', // green-40
  };

  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-solid',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
      style={{
        borderColor: borderColorMap[color],
        borderTopColor: 'transparent',
        opacity: 1,
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
