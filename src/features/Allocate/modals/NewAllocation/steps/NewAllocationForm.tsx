'use client';

import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
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
import CarbonClassesCard from '../../../shared/CarbonClassesCard';
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
    <div className="flex lg:flex-row flex-col gap-10 w-full justify-center">
      <SoloCard title="New allocation" className="grow-1 max-w-[38.2rem] h-fit">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 pt-3">
            <SelectInput
              label="Token"
              defaultValue={newAllocationDialog.token ?? 'kvcm'}
              items={ALLOCATION_TOKENS_FORM_INPUT_ITEMS}
              {...form.register('token')}
            />
            <Input
              label="Amount"
              type="number"
              iconSrc={tokens[typedToken].iconSrc}
              {...form.register('amount')}
              error={formState.errors.amount}
            />
            <SelectInput
              label="Carbon Class"
              items={carbonClassesSelectInputItems}
              {...form.register('carbonClass')}
              error={formState.errors.carbonClass}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button colors="secondary" context="flow" type="submit">
              Confirm Allocation
            </Button>
            <Button colors="primary" context="flow" href={`${ROUTES.ALLOCATE}`}>
              Cancel
            </Button>
          </div>
        </form>
      </SoloCard>
      <CarbonClassesCard className="grow-1 max-w-[38.2rem]" />
    </div>
  );
};

export default NewAllocationForm;
