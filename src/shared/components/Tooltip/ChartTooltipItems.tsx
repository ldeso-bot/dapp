type KeyValue = {
  label: string;
  value: React.ReactNode;
};

type Props = {
  items: KeyValue[];
};

export default function ChartTooltipItems({ items }: Props) {
  return items.map((item) => (
    <div key={item.label} className="flex flex-row gap-2 justify-between">
      <div className="font-bold">{item.label}:</div>
      <div className="font-normal">{item.value}</div>
    </div>
  ));
}
