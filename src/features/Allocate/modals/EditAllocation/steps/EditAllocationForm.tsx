'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtomValue } from 'jotai';
import {
  EditAllocationFields,
  editAllocationDialogAtom,
} from '../editAllocation.utils';

const EditAllocationForm: FormFlowStep<EditAllocationFields> = ({
  next,
  data,
}) => {
  const { form } = data;
  const { handleSubmit, formState } = form;
  const editAllocationDialogState = useAtomValue(editAllocationDialogAtom);
  const allocation = editAllocationDialogState.allocation;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  if (!allocation) return null;

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-size-20 font-semibold text-gray-900">
          Edit Allocation
        </h2>
        <p className="text-md text-gray-600">
          Update how much you allocate to this class. Rebalancing doesn’t change
          kVCM lock maturities.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formState.errors.allocationId?.message}
        <InputGroup>
          <Input
            label="Token"
            defaultValue={tokens[allocation.token.name].symbol}
            iconSrc={tokens[allocation.token.name].iconSrc}
            readOnly
          />
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens[allocation.token.name].iconSrc}
            {...form.register('amount')}
            error={formState.errors.amount}
          />
          <Input
            label="Carbon Class"
            defaultValue={allocation.carbonClass}
            readOnly
          />
        </InputGroup>
        <div className="flex gap-3 w-full">
          <Button
            className="rounded-lg"
            colors="primary"
            context="flow"
            href={`${ROUTES.ALLOCATE}`}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg"
            colors="secondary"
            context="flow"
            type="submit"
          >
            Save Allocation
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditAllocationForm;
