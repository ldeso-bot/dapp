import { cn } from '@/shared/utils/component.utils';
import Skeleton from '../Skeleton/Skeleton';
import { Tooltip } from '../Tooltip/Tooltip';

export type CardProps = {
  className?: string;
  title?: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: 'close' | 'far';
  titleClassName?: string;
  skeletonClassName?: string;
  titleAddOnBadgeClassName?: string;
  titleAddOnFar?: React.ReactNode;
  titleAddOnClose?: React.ReactNode;
  titleAddOnBadge?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'default' | 'info';
};

export default function Card({
  children,
  className,
  title,
  tooltip,
  tooltipPosition = 'close',
  titleClassName,
  skeletonClassName,
  titleAddOnFar,
  titleAddOnClose,
  titleAddOnBadge,
  titleAddOnBadgeClassName,
  variant = 'default',
}: CardProps) {
  const border = variant === 'default' ? 'border-gray-300' : 'border-green-300';
  const background = variant === 'default' ? 'bg-background' : 'bg-green-50';
  const text = variant === 'default' ? 'text-void-50' : 'text-green-80';
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border-gray-300 border-1 p-5',
        background,
        border,
        className
      )}
    >
      {(title || titleAddOnBadge || titleAddOnClose || tooltip) && (
        <div className="flex flex-row justify-between items-center pb-2">
          <div
            className={cn('flex flex-row w-full items-center gap-2 grow-1', {
              'justify-between': tooltipPosition == 'far',
            })}
          >
            <div className={cn(text, 'text-size-16', titleClassName)}>
              {title}
            </div>
            {titleAddOnBadge && (
              <div
                className={cn(
                  text,
                  'text-[1rem] px-2 py-0 rounded-full border border-gray-200 bg-gray-100',
                  titleAddOnBadgeClassName
                )}
              >
                {titleAddOnBadge}
              </div>
            )}
            {titleAddOnClose}
            {tooltip && <Tooltip content={tooltip} />}
          </div>
          {titleAddOnFar}
        </div>
      )}
      <div className={cn('flex flex-col gap-2 h-full', text)}>
        {children}
        {!children && (
          <Skeleton className={cn('rounded grow-1', skeletonClassName)} />
        )}
      </div>
    </div>
  );
}
