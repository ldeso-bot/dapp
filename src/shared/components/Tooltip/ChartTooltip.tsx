import { cn } from '@/shared/utils/component.utils';
import styles from './tooltip.module.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function ChartTooltip({ className, children }: Props) {
  return (
    <div className={cn(styles.TooltipContent, className)}>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
