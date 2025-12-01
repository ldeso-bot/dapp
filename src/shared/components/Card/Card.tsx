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
  titleAddOnFar?: React.ReactNode;
  titleAddOnClose?: React.ReactNode;
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
          className={cn('flex flex-row w-full items-center gap-1 grow-1', {
            'justify-between': tooltipPosition == 'far',
          })}
        >
          <div className={cn('text-void-50 text-size-16', titleClassName)}>
            {title}
          </div>
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
