'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import { useTransferWithPermit } from '@/features/LockToken/lockToken.utils';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatAddress, formatTimestamp } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import {
  stakeLpTokenDialogAtom,
  StakeLpTokenFields,
} from '../stakeLpToken.utils';

const StakeLpTokenConfirm: FormFlowStep<StakeLpTokenFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setAlert = useSetAtom(alertAtom);
  const setLockTokenDialogState = useSetAtom(stakeLpTokenDialogAtom);
  // TODO: placeholder
  const { contract } = useTransferWithPermit();

  const onSubmit = async () => {
    console.info(form.getValues());
    setAlert({
      title: 'Unlock Successful',
      description:
        'You’ve successfully unlocked your 12.00 {{LP Token }} claimed 12.00 KlimaX in rewards! You can manage your positions in the “my holdings” dashboard.',
      type: 'success',
      links: [
        {
          label: 'My Holdings',
          href: ROUTES.MY_HOLDINGS,
        },
      ],
    });
    setLockTokenDialogState({ open: false, token: null });
  };

  return (
    <Card title="Confirm your transaction">
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 pt-3">
          To complete this transaction, please allow our smart contract to
          <Input
            label="Contract Address"
            value={formatAddress(contract?.address)}
            readOnly={true}
          />
          <Input
            label="You are sending"
            readOnly={true}
            iconSrc={tokens.kvcm.iconSrc}
            value={`${parsedForm.current?.amount} ${tokens.kvcm.symbol}`}
          />
          <Input
            label="Maturity date"
            readOnly={true}
            value={formatTimestamp(parsedForm.current?.maturityDate)}
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
      </form>
    </Card>
  );
};

export default StakeLpTokenConfirm;
