import clsx from 'clsx';
import styles from './tooltip.module.css';

type KeyValue = {
  label: string;
  value: React.ReactNode;
};

type Props = {
  className?: string;
  items: KeyValue[];
};
export default function ChartTooltip({ className, items }: Props) {
  return (
    <div className={clsx(styles.TooltipContent, className)}>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex flex-row gap-2 justify-between">
            <div className="font-bold">{item.label}:</div>
            <div className="font-normal">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
