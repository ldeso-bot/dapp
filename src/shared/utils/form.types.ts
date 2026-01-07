import { Control, FieldValues, Path } from 'react-hook-form';

export type FormControlProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};
