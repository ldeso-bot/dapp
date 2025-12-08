import { cn } from '@/shared/utils/component.utils';
import Skeleton from '../Skeleton/Skeleton';
import { Tooltip } from '../Tooltip/Tooltip';

export type CardProps = {
  className?: string;
  title?: string;
  tooltip?: string;
  tooltipPosition?: 'close' | 'far';
  titleClassName?: string;
  skeletonClassName?: string;
  titleAddOnBadgeClassName?: string;
  titleAddOnFar?: React.ReactNode;
  titleAddOnClose?: React.ReactNode;
  titleAddOnBadge?: React.ReactNode;
  children?: React.ReactNode;
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
}: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col box-shadow border-void-20 border-1 bg-background p-5',
        className
      )}
    >
      <div className="flex flex-row justify-between items-center pb-2">
        <div
          className={cn('flex flex-row w-full items-center gap-2 grow-1', {
            'justify-between': tooltipPosition == 'far',
          })}
        >
          <div className={cn('text-void-50 text-size-16', titleClassName)}>
            {title}
          </div>
          {titleAddOnBadge && (
            <div
              className={cn(
                'text-[1rem] px-2 py-0 rounded-full border border-gray-200 bg-gray-100 text-gray-800',
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
      <div className="flex flex-col gap-2 h-full">
        {children}
        {!children && (
          <Skeleton className={cn('rounded grow-1', skeletonClassName)} />
        )}
      </div>
    </div>
  );
}
