import { FieldError, GlobalError } from 'react-hook-form';

type Props = {
  error?: FieldError | GlobalError;
};

export default function InputError({ error }: Props) {
  if (!error) {
    return null;
  }

  return <div className="text-red-60 text-size-10">{error.message}</div>;
}
