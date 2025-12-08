'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import Form from '@/shared/components/Form/layout/Form';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ALLOCATION_TOKENS_FORM_INPUT_ITEMS } from '@/shared/constants/form.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_ALLOCATION_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useCarbonClasses } from '@/shared/hooks/web3/useCarbonClasses';
import { useAtomValue } from 'jotai';
import {
  newAllocationDialogAtom,
  NewAllocationFields,
} from '../newAllocation.utils';

const NewAllocationForm: FormFlowStep<NewAllocationFields> = ({
  next,
  data,
}) => {
  const { form } = data;
  const { handleSubmit, formState, watch } = form;

  const { selectInputItems: carbonClassesSelectInputItems } =
    useCarbonClasses();

  const newAllocationDialog = useAtomValue(newAllocationDialogAtom);

  const token = watch('token');

  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-size-20 font-semibold text-gray-900">
          New Allocation
        </h2>
        <p className="text-md text-gray-600">
          Create an allocation that applies your tokens to a carbon class.
          Allocations affect the protocol’s indicative price for that class.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <div className="flex flex-col gap-1">
            <SelectInput
              label="Token"
              defaultValue={newAllocationDialog.token ?? 'kvcm'}
              items={ALLOCATION_TOKENS_FORM_INPUT_ITEMS}
              {...form.register('token')}
            />
            <small className="text-size-12 text-gray-500">
              Allocations influence the indicative price by adding token weight
              to this class.
            </small>
          </div>
          <SelectInput
            label="Carbon Class"
            placeholder="Select a carbon class"
            items={carbonClassesSelectInputItems}
            {...form.register('carbonClass')}
            error={formState.errors.carbonClass}
          />
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens[typedToken].iconSrc}
            {...form.register('amount')}
            error={formState.errors.amount}
          />
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            <p className="text-size-14 text-gray-500">
              Rebalancing never changes your lock maturity dates.
            </p>
          </div>
        </div>
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

export default NewAllocationForm;
