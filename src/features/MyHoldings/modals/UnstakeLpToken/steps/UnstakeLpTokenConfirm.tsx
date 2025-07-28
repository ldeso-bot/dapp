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
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import {
  tooltip,
  unstakeLpTokenDialogAtom,
  UnstakeLpTokenFields,
} from '../unstakeLpToken.utils';

const UnstakeLpTokenConfirm: FormFlowStep<UnstakeLpTokenFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const { formState } = form;

  const setAlert = useSetAtom(alertAtom);
  const router = useRouter();
  const unstakeLpTokenDialogState = useAtomValue(unstakeLpTokenDialogAtom);
  const liquidityPosition = unstakeLpTokenDialogState.liquidityPosition;

  if (!liquidityPosition) return null;

  const onSubmit = async () => {
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
    router.push(ROUTES.MY_HOLDINGS);
  };

  return (
    <SoloCard title="Confirm your transaction">
      <Form
        onSubmit={form.handleSubmit(onSubmit)}
        description="Give the transaction one final review before submitting to the
            blockchain."
      >
        <InputGroup>
          <Input
            label="Pool"
            value={tokens[liquidityPosition.token].symbol}
            iconSrc={tokens[liquidityPosition.token].iconSrc}
            readOnly={true}
          />
          <Input
            label="You are receiving"
            value={`${parsedForm.current?.amount} ${tokens[liquidityPosition.token].symbol}`}
            iconSrc={tokens[liquidityPosition.token].iconSrc}
            error={formState.errors.amount}
          />
          <Input
            label="You are receiving"
            iconSrc={tokens.k2.iconSrc}
            readOnly={true}
            value={`${liquidityPosition.rewards.k2} ${tokens.k2.symbol}`}
            tooltip={tooltip}
          />
          <Input
            label="You are receiving"
            iconSrc={tokens.kvcm.iconSrc}
            readOnly={true}
            value={`${liquidityPosition.rewards.kvcm} ${tokens.kvcm.symbol}`}
            tooltip={tooltip}
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

export default UnstakeLpTokenConfirm;
