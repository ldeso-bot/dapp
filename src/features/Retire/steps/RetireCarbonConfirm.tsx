'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Dialog from '@/shared/components/Dialog/Dialog';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatAddress } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { RetireCarbonFields } from '../retire.constants';
import { retireCarbonDialogAtom } from '../retire.utils';

const RetireCarbonConfirm: FormFlowStep<RetireCarbonFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setRetireCarbonDialogState = useSetAtom(retireCarbonDialogAtom);

  const onSubmit = async () => {
    setRetireCarbonDialogState({ open: false, token: null });
  };

  return (
    <Dialog className="bg-overlay-10" open={true}>
      <Card
        className="w-[36rem] border-0 rounded-xl"
        titleClassName="font-bold text-void-80 text-size-18"
        title="Confirm your transaction"
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 pt-3">
            To complete this transaction, please allow our smart contract to
            transfer tokens on your behalf.
            <Input
              label="Contract Address"
              // @todo replace address
              value={formatAddress(
                '0x061138CBfEA4531D9ae118e36B86e7CD27649523'
              )}
              readOnly
            />
            <Input
              label="You are sending"
              readOnly
              iconSize="sm"
              iconSrc={tokens.kvcm.iconSrc}
              value={`${parsedForm.current?.amount} ${tokens.kvcm.symbol}`}
            />
            <Input
              label="You are receiving"
              readOnly
              iconSize="sm"
              iconSrc={tokens.kvcm.iconSrc}
              value={`${parsedForm.current?.amount} ${tokens.kvcm.symbol}`}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button colors="secondary" context="flow" type="submit">
              Approve
            </Button>
            <Button colors="primary" context="flow" onClick={previous}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default RetireCarbonConfirm;
