type Props = {
  label: string;
  value: string | number;
};

export default function ChartFact(props: Props) {
  const { label, value } = props;
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="text-size-20 font-bold">{value}</div>
      <div className="text-size-14 text-void-60">{label}</div>
    </div>
  );
}
