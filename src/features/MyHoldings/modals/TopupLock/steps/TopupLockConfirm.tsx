'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import { useTransferWithPermit } from '@/features/MyHoldings/modals/LockToken/lockToken.utils';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import Form from '@/shared/components/Form/layout/Form';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatAddress } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
  TopupLockFields,
} from '../topupLock.utils';

const TopupLockConfirm: FormFlowStep<TopupLockFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const { contract } = useTransferWithPermit();
  const setAlert = useSetAtom(alertAtom);
  const setTopupLockDialogState = useSetAtom(topupLockDialogAtom);

  const onSubmit = async () => {
    setAlert({
      type: 'success',
      title: 'Top up successful',
      description: 'You’ve successfully topped up',
      links: [{ label: 'My Holdings', href: ROUTES.MY_HOLDINGS }],
    });

    // reset the dialog
    setTopupLockDialogState(resetTopupLockDialog());
  };

  return (
    <SoloCard title="Confirm your transaction">
      <Form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 pt-3">
          To complete this transaction, please allow our smart contract to
          <Input
            readOnly
            label="Contract Address"
            value={formatAddress(contract?.address)}
          />
          <Input
            readOnly
            label="You are sending"
            iconSrc={tokens.kvcm.iconSrc}
            value={`${parsedForm.current?.amount} ${tokens.kvcm.symbol}`}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Submit
          </Button>
          <Button colors="primary" context="flow" onClick={previous}>
            Cancel
          </Button>
        </div>
      </Form>
    </SoloCard>
  );
};

export default TopupLockConfirm;
