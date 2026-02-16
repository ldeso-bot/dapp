'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import { useAllocateK2 } from '@/features/Allocate/hooks/useAllocateK2';
import { useAllocateKvcm } from '@/features/Allocate/hooks/useAllocateKvcm';
import { CarbonClassSelect } from '@/features/Allocate/shared/CarbonClassSelect';
import { LockSelect } from '@/features/Allocate/shared/LockSelect';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import Input from '@/shared/components/Form/Input';
import Form from '@/shared/components/Form/layout/Form';
import { RootError } from '@/shared/components/Form/RootError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_ALLOCATION_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isNullish } from 'remeda';
import { parseUnits } from 'viem';
import { useNewAllocationValidation } from '../hooks/useNewAllocationValidation';
import { NewAllocationFields } from '../newAllocation.utils';

const NewAllocationForm: FormFlowStep<NewAllocationFields> = ({ data }) => {
  const { form } = data;
  const router = useRouter();
  const { data: protocolData } = useProtocolData();
  const { allocate: allocateK2 } = useAllocateK2();
  const { allocate: allocateKvcm } = useAllocateKvcm();

  const setAlert = useSetAtom(alertAtom);
  const { handleSubmit, formState, watch, setError, clearErrors } = form;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: walletData } = useWalletData();

  const token = watch('token');
  const amount = watch('amount');
  const contractLockId = watch('contractLockId');

  const isAmountTouched = formState.touchedFields.amount;
  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;

  const isKvcm = typedToken === 'kvcm';
  const isK2 = typedToken === 'k2';

  const { errorMessage, availableKvcm, availableK2, hasKvcmLocksAvailable } =
    useNewAllocationValidation({
      amount,
      contractLockId,
      isKvcm,
      isK2,
      isAmountTouched,
    });

  const walletTokenBalance = walletData?.balances?.[typedToken] ?? 0;

  const maxAmount = isKvcm
    ? contractLockId
      ? (availableKvcm.get(Number(contractLockId)) ?? 0)
      : 0
    : (availableK2 ?? walletTokenBalance);

  const onSubmit = async (formData: NewAllocationFields) => {
    if (!isToken(formData.token) || errorMessage) return;

    clearErrors('root');
    setIsSubmitting(true);

    try {
      const carbonClassAddress = protocolData?.carbonClasses.find(
        (c) => c.name === formData.carbonClass
      )?.carbonClassId;

      if (!carbonClassAddress) {
        setError('root', {
          type: 'manual',
          message: 'Selected carbon class is not available',
        });
        return;
      }

      const amount = parseUnits(formData.amount.toString(), 18);
      let result: { error: string | null } = { error: null };

      if (isKvcm) {
        if (isNullish(formData.contractLockId)) {
          setError('root', {
            type: 'manual',
            message: 'Please select a lock',
          });
          return;
        }

        result = await allocateKvcm({
          lockId: formData.contractLockId,
          carbonClass: carbonClassAddress,
          amount,
        });
      } else if (isK2) {
        result = await allocateK2({
          carbonClass: carbonClassAddress,
          amount,
        });
      }

      if (result.error) {
        setError('root', { type: 'manual', message: result.error });
      } else {
        setAlert({
          title: 'Allocation Successful',
          description: `You've successfully allocated ${formData.amount} ${tokens[typedToken].symbol} to ${formData.carbonClass}! You can edit this allocation at any time.`,
          type: 'success',
        });
        router.push(ROUTES.ALLOCATE);
      }
    } catch (error) {
      console.error('Allocation error:', error);
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem] mx-auto">
      <DialogHeader
        showCloseButton
        title="New Allocation"
        onClose={() => router.push(ROUTES.ALLOCATE)}
      />
      <div className="space-y-2 pt-2">
        <p className="text-md text-gray-600">
          Create an allocation that applies your tokens to a carbon class.
          Allocations affect the protocol’s indicative price for that class.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <div className="flex flex-col gap-1">
            <Input
              readOnly
              iconSize="sm"
              label="Token"
              value={isKvcm ? tokens.kvcm.symbol : tokens.k2.symbol}
              iconSrc={isKvcm ? tokens.kvcm.iconSrc : tokens.k2.iconSrc}
            />
            <small className="text-size-12 text-gray-500">
              Allocations influence the indicative price by adding token weight
              to this class.
            </small>
          </div>
          <CarbonClassSelect
            name="carbonClass"
            control={form.control}
            errors={formState.errors}
          />
          {isKvcm && (
            <LockSelect
              name="contractLockId"
              control={form.control}
              errors={formState.errors}
            />
          )}
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label="Amount"
                  type="number"
                  iconSize="sm"
                  iconSrc={tokens[typedToken].iconSrc}
                  {...form.register('amount', { valueAsNumber: true })}
                  error={
                    formState.errors.amount ||
                    (errorMessage
                      ? { type: 'manual', message: errorMessage }
                      : undefined)
                  }
                  onFocus={(e) => {
                    if (
                      e.currentTarget.value !== '' &&
                      Number(e.currentTarget.value) === 0
                    ) {
                      e.currentTarget.select();
                    }
                  }}
                />
              </div>

              <Button
                type="button"
                colors="secondary"
                className="rounded-xl min-h-[4rem]"
                onClick={() =>
                  form.setValue('amount', Number(maxAmount), {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                disabled={(isKvcm && !contractLockId) || Number(maxAmount) <= 0}
              >
                Max
              </Button>
            </div>

            {isKvcm && contractLockId && (
              <small className="text-size-12 text-gray-800">
                Available:{' '}
                {(
                  availableKvcm.get(Number(contractLockId)) ?? 0
                ).toLocaleString()}{' '}
                {tokens[typedToken].symbol}
              </small>
            )}
            {isK2 && (
              <small className="text-size-12 text-gray-800">
                Available: {availableK2.toLocaleString()} {tokens.k2.symbol}
              </small>
            )}
          </div>
          {formState.errors.root && (
            <RootError
              sticky={false}
              errorMessage={formState.errors.root.message ?? ''}
            />
          )}
        </div>
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
            disabled={
              isSubmitting ||
              !!errorMessage ||
              (isKvcm && !hasKvcmLocksAvailable)
            }
          >
            {isSubmitting ? 'Submitting...' : 'Save Allocation'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default NewAllocationForm;
