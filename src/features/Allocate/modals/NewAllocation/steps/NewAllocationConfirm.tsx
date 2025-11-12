'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_ALLOCATION_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { NewAllocationFields } from '../newAllocation.utils';

const NewAllocationConfirm: FormFlowStep<NewAllocationFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const { watch } = form;

  const setAlert = useSetAtom(alertAtom);
  const router = useRouter();
  const token = watch('token');
  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;
  const carbonClassName = parsedForm.current?.carbonClass;

  const onSubmit = async () => {
    if (isToken(parsedForm.current?.token)) {
      setAlert({
        title: 'Unlock Successful',
        description: `You’ve successfully allocated ${parsedForm.current?.amount} ${tokens[typedToken].symbol} to ${carbonClassName}! You can edit this allocation at any time.`,
        type: 'success',
      });
    }
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
              value={`${parsedForm.current?.amount} ${tokens[typedToken].symbol}`}
              iconSrc={tokens[typedToken].iconSrc}
              readOnly={true}
            />
            <Input label="Carbon Class" value={carbonClassName} />
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

export default NewAllocationConfirm;
