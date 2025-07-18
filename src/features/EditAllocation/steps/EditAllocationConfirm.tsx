'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import {
  EditAllocationFields,
  editAllocationDialogAtom,
} from '../editAllocation.utils';

const EditAllocationConfirm: FormFlowStep<EditAllocationFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;

  const setAlert = useSetAtom(alertAtom);
  const router = useRouter();
  const editAllocationDialogState = useAtomValue(editAllocationDialogAtom);
  const allocation = editAllocationDialogState.allocation;

  if (!allocation) return null;

  const onSubmit = async () => {
    setAlert({
      title: 'Unlock Successful',
      description: `You’ve successfully allocated ${parsedForm.current?.amount} ${tokens[allocation.token.name].symbol} to ${allocation.carbonClass}! You can edit this allocation at any time.`,
      type: 'success',
    });
    router.push(ROUTES.ALLOCATE);
  };

  return (
    <div className="flex flex-row justify-center">
      <SoloCard title="Confirm your transaction" className="max-w-[38.2rem]">
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 pt-3">
            Give the transaction one final review before submitting to the
            blockchain.
            <Input
              label="You are allocating"
              value={`${parsedForm.current?.amount} ${tokens[allocation.token.name].symbol}`}
              iconSrc={tokens[allocation.token.name].iconSrc}
              readOnly={true}
            />
            <Input label="Carbon Class" value={allocation.carbonClass} />
          </div>{' '}
          <div className="flex flex-col gap-3 w-full">
            <Button colors="secondary" context="flow" type="submit">
              Submit
            </Button>
            <Button colors="primary" context="flow" onClick={previous}>
              Cancel
            </Button>
          </div>
        </form>
      </SoloCard>
    </div>
  );
};

export default EditAllocationConfirm;
