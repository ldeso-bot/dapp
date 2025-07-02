type Props = {
  error?: string | null;
};

export default function FormError({ error }: Props) {
  if (!error) {
    return null;
  }

  return (
    <div className="text-red text-size-10 bg-red-10 p-2 rounded-lg">
      {error}
    </div>
  );
}
