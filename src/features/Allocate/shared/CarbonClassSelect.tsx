'use client';

import InputWrapper from '@/shared/components/Form/layout/InputWrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/Select/Select';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useCarbonClasses } from '@/shared/hooks/web3/useCarbonClasses';
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  Path,
} from 'react-hook-form';

type CarbonClassSelectProps<T extends { carbonClass?: string }> = {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
};

export const CarbonClassSelect = <T extends { carbonClass?: string }>(
  props: CarbonClassSelectProps<T>
) => {
  const { name, control, errors } = props;
  const { data: protocolData, isLoading: isLoadingProtocolData } =
    useProtocolData();
  const {
    selectInputItems: carbonClassesSelectInputItems,
    isLoading: isLoadingCarbonClasses,
  } = useCarbonClasses();

  const carbonClasses =
    carbonClassesSelectInputItems.length > 0
      ? carbonClassesSelectInputItems
      : protocolData?.carbonClasses.map((c) => ({
          value: c.name,
          label: c.name,
        })) || [];

  const isLoading = isLoadingCarbonClasses || isLoadingProtocolData;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputWrapper
          label="Carbon Class"
          error={errors?.carbonClass as FieldError}
        >
          <Select
            value={field.value || undefined}
            onValueChange={field.onChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isLoading
                    ? 'Loading carbon classes...'
                    : carbonClasses.length === 0
                      ? 'No carbon classes available'
                      : 'Select a carbon class'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {carbonClasses.length === 0 ? (
                <div className="py-2 px-3 text-size-14 text-text-3">
                  {isLoading ? 'Loading...' : 'No carbon classes available'}
                </div>
              ) : (
                carbonClasses.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
      )}
    />
  );
};
