import { FieldError } from 'react-hook-form';

type Props = {
  error?: FieldError;
};

export default function InputError({ error }: Props) {
  if (!error) {
    return null;
  }

  return <div className="text-red-600 text-size-10">{error.message}</div>;
}
