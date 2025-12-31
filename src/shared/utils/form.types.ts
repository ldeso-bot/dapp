import { Control, FieldValues } from 'react-hook-form';

export type FormControlProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
};
