import { FieldValues, FormState } from 'react-hook-form';

type Props<T extends FieldValues> = {
  formState: FormState<T>;
};

export default function FormErrors<T extends FieldValues>({
  formState,
}: Props<T>) {
  const { errors, dirtyFields } = formState;
  console.log(errors, dirtyFields);

  // If there are no errors, don't render anything
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(errors).map(([fieldName, error]) => (
        <div key={fieldName} className="text-red text-size-14">
          {fieldName} - {error?.message as string}
        </div>
      ))}
    </div>
  );
}
