import { useEffect, useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export const useParsedForm = <T extends FieldValues>(
  form: UseFormReturn<T>,
  schema: ZodSchema
) => {
  const parsedForm = useRef<T>(null);
  useEffect(() => {
    const { success, data } = schema.safeParse(form.getValues());
    parsedForm.current = success ? data : null;
  });
  return parsedForm;
};
