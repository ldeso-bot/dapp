'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import {
  tooltip,
  unlockTokenDialogAtom,
  UnlockTokenFields,
} from '../unlockToken.utils';

const UnlockTokenConfirm: FormFlowStep<UnlockTokenFields> = ({
  previous,
  data,
}) => {
  const { form } = data;
  const { formState } = form;

  const setAlert = useSetAtom(alertAtom);
  const router = useRouter();
  const unlockTokenDialogState = useAtomValue(unlockTokenDialogAtom);
  const lock = unlockTokenDialogState.lock;

  if (!lock) return null;

  const onSubmit = async () => {
    setAlert({
      title: 'Unlock Successful',
      description: `You've successfully unlocked ${lock.lockedAmount} of your ${tokens[lock.token].symbol} tokens! You can manage your positions in the "My Activities" dashboard.`,
      type: 'success',
      links: [
        {
          label: 'My Activities',
          href: ROUTES.MY_ACTIVITIES,
        },
      ],
    });
    router.push(ROUTES.MY_ACTIVITIES);
  };

  return (
    <Card title="Confirm your transaction">
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 pt-3">
          Give the transaction one final review before submitting to the
          blockchain.
          <Input
            label="Token"
            value={tokens[lock.token].symbol}
            iconSrc={tokens[lock.token].iconSrc}
            readOnly={true}
          />
          <Input
            label="Amount to unlock"
            value={`${lock.lockedAmount}%`}
            iconSrc={tokens[lock.token].iconSrc}
            error={formState.errors.proportional}
            tooltip={tooltip}
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

export default UnlockTokenConfirm;
