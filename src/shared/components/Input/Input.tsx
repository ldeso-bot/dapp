type Props = {
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  icon?: string;
  onValueChange?: (value: string) => void;
  value?: string;
};

export default function Input({
  label = 'Token',
  type = 'text',
  onValueChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-semibold">{label}</label>
      <input type={type} className="p-3 rounded-lg border-1" />
    </div>
  );
}
