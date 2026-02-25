type Props = {
  label: string;
  value: string;
};

export default function Metric({ label, value }: Props) {
  return (
    <div className="flex items-baseline gap-1 sm:flex-col sm:items-center sm:gap-0">
      <div className="text-size-14 font-bold">{value}</div>
      <div className="text-void-12">{label}</div>
    </div>
  );
}
