'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import { useAllocateK2 } from '@/features/Allocate/hooks/useAllocateK2';
import { useAllocateKvcm } from '@/features/Allocate/hooks/useAllocateKvcm';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import Input from '@/shared/components/Form/Input';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatDateDDMMYYYY } from '@/shared/utils/date.utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EditAllocationFields, editAllocationDialogAtom } from '../editAllocation.utils';
import { useEditAllocationChangeNotification } from '../hooks/useEditAllocationChangeNotification';
import { useEditAllocationValidation } from '../hooks/useEditAllocationValidation';
import {
  executeEditAllocation,
  getEditAllocationSuccessMessage,
} from '../utils/editAllocation.utils';

const EditAllocationForm: FormFlowStep<EditAllocationFields> = ({ data }) => {
  const router = useRouter();
  const { form } = data;
  const { allocate, deallocate } = useAllocateKvcm();
  const { allocate: allocateK2, deallocate: deallocateK2 } = useAllocateK2();
  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const setAlert = useSetAtom(alertAtom);
  const editAllocationDialogState = useAtomValue(editAllocationDialogAtom);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const allocation = editAllocationDialogState.allocation;
  const originalAmount = Number(allocation?.amount ?? 0);

  const watchedAmount = watch('amount');
  const newAmount = watchedAmount != null && !isNaN(Number(watchedAmount)) ? Number(watchedAmount) : originalAmount;

  const { errorMessage, availableKvcm, maxK2ForThisAllocation, isKvcm, isK2 } =
    useEditAllocationValidation({
      allocation,
      newAmount,
      originalAmount,
    });

  const { changeNotification, carbonClassName, tokenSymbol } =
    useEditAllocationChangeNotification({
      allocation,
      newAmount,
      originalAmount,
    });
  
  const lockInfo =
    isKvcm && allocation?.lockedUntil
      ? `Matures: ${formatDateDDMMYYYY(allocation.lockedUntil)}`
      : null;

  const onSubmit = async (formData: EditAllocationFields) => {

    if (!allocation) {
      setError('root', {
        type: 'manual',
        message: 'Allocation data is missing',
      });
      return;
    }
    if (errorMessage) return;

    clearErrors('root');
    setIsSubmitting(true);

    try {
      const amountDiff = formData.amount - allocation.amount;
      const result = await executeEditAllocation({
        allocation,
        amountDiff,
        isKvcm,
        isK2,
        allocateKvcm: allocate,
        deallocateKvcm: deallocate,
        allocateK2,
        deallocateK2,
      });

      if (result.error) {
        setError('root', { type: 'manual', message: result.error });
        return;
      }

      const successMessage = getEditAllocationSuccessMessage({
        newAmount: formData.amount,
        tokenSymbol,
        carbonClassName,
      });

      setAlert({
        title: 'Allocation Updated',
        description: successMessage,
        type: 'success',
      });
      router.push(ROUTES.ALLOCATE);
    } catch (error) {
      console.error('Edit allocation error:', error);
      setError('root', { type: 'manual', message: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!allocation) return null;

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem] mx-auto">
      <DialogHeader
        showCloseButton
        title="Edit Allocation"
        onClose={() => router.push(ROUTES.ALLOCATE)}
      />
      <div className="space-y-2">
        <p className="text-md text-gray-600">
          Update how much you allocate to this class. Rebalancing doesn’t change
          kVCM lock maturities.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-0">
        {formState.errors.allocationId?.message}
        <InputGroup className="flex flex-col gap-4">
          <Input
            label="Token"
            iconSize="sm"
            defaultValue={tokens[allocation.token.name].symbol}
            iconSrc={tokens[allocation.token.name].iconSrc}
            readOnly
          />
          <div className="flex flex-col gap-1">
            <Input
              min="0"
              label="Amount"
              type="number"
              iconSize="sm"
              iconSrc={tokens[allocation.token.name].iconSrc}
              {...form.register('amount')}
              error={
                formState.errors.amount ||
                (errorMessage
                  ? { type: 'manual', message: errorMessage }
                  : undefined)
              }
            />
            {isKvcm && allocation.contractLockId && (
              <small className="text-size-12 text-gray-500">
                Maximum available:{' '}
                {(
                  (availableKvcm.get(allocation.contractLockId) ?? 0) +
                  originalAmount
                ).toLocaleString()}{' '}
                {tokenSymbol}
              </small>
            )}
            {isK2 && (
              <small className="text-size-12 text-gray-500">
                Available:{' '}
                {maxK2ForThisAllocation.toLocaleString()} K2
              </small>
            )}
          </div>
          <Input label="Carbon Class" value={carbonClassName} readOnly />
          {lockInfo && <Input label="Lock Info" value={lockInfo} readOnly />}
          {changeNotification && !errorMessage && (
            <RootError
              errorMessage={changeNotification}
              variant="warning"
              sticky={false}
            />
          )}
          {formState.errors.root && (
            <RootError
              sticky={false}
              errorMessage={formState.errors.root.message ?? ''}
            />
          )}
        </InputGroup>
        <div className="flex gap-3 w-full">
          <Button
            className="rounded-lg"
            colors="primary"
            context="flow"
            type="button"
            onClick={() => router.push(ROUTES.ALLOCATE)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg"
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting || !!errorMessage || (changeNotification === 'The allocation amount has not changed.')}
          >
            {isSubmitting ? 'Submitting...' : 'Save Allocation'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditAllocationForm;
