type Props = {
  label?: string;
};

export default function TokenInput({ label = 'Token' }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-semibold">{label}</label>
      <select>
        <option value="klima">Klima</option>
      </select>
    </div>
  );
}
