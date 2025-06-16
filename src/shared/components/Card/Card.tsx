import clsx from 'clsx';
import Tooltip from '../Tooltip/Tooltip';

export type CardProps = {
  className?: string;
  title?: string;
  tooltip?: string;
  tooltipPosition?: 'close' | 'far';
};
type Props = CardProps & {
  children: React.ReactNode;
};
export default function Card({
  children,
  className,
  title,
  tooltip,
  tooltipPosition = 'close',
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col box-shadow border-void-20 border-1 bg-background p-5',
        className
      )}
    >
      <div
        className={clsx('flex flex-row w-full items-center gap-1 pb-2', {
          'justify-between': tooltipPosition == 'far',
        })}
      >
        <div className="text-void-50 text-size-16">{title}</div>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
