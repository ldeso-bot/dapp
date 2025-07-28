'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatAddress, formatTimestamp } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import {
  lockTokenDialogAtom,
  LockTokenFields,
  useTransferWithPermit,
} from '../lockToken.utils';

const PurchaseBondConfirm: FormFlowStep<LockTokenFields> = ({
  previous,
  data,
}) => {
  const { send, contract } = useTransferWithPermit();
  const { parsedForm, form } = data;
  const setAlert = useSetAtom(alertAtom);
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  const onSubmit = async () => {
    const { error } = await send();
    if (error) {
      setAlert({
        title: 'Error',
        description:
          'Something went wrong on our end and your unlock was not successful. Please try again in a few minutes.',
        type: 'error',
        links: [],
      });
    } else {
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
    }
    setLockTokenDialogState({ open: false, token: null });
  };

  return (
    <SoloCard title="Confirm your transaction">
      <Form
        onSubmit={form.handleSubmit(onSubmit)}
        description="To complete this transaction, please allow our smart contract to
          transfer tokens on your behalf. Test: Clicking Submit will make a USDC
          transfer with permit"
      >
        <InputGroup>
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
        </InputGroup>
        <ButtonGroup>
          <Button colors="secondary" context="flow" type="submit">
            Submit
          </Button>
          <Button colors="primary" context="flow" onClick={previous}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </SoloCard>
  );
};

export default PurchaseBondConfirm;
