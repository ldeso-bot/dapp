import { FC, RefObject } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { StepProps } from './Steps';

export type FormFlowData<T extends FieldValues> = {
  form: UseFormReturn<T>;
  schema: ZodSchema<T>;
  parsedForm: RefObject<T | null>;
};

export type FormFlowStep<T extends FieldValues> = FC<
  StepProps<FormFlowData<T>>
>;
