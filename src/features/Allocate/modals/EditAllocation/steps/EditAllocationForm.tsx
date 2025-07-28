'use client';

import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtomValue } from 'jotai';
import CarbonClassesCard from '../../../shared/CarbonClassesCard';
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
    <div className="flex lg:flex-row flex-col gap-10 w-full justify-center">
      <SoloCard
        title="Edit allocation"
        className="grow-1 max-w-[38.2rem] h-fit"
      >
        {formState.errors.allocationId?.message}
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          </InputGroup>
          <ButtonGroup>
            <Button colors="secondary" context="flow" type="submit">
              Confirm Allocation
            </Button>
            <Button colors="primary" context="flow" href={`${ROUTES.ALLOCATE}`}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </SoloCard>
      <CarbonClassesCard className="grow-1 max-w-[38.2rem]" />
    </div>
  );
};

export default EditAllocationForm;
