'use client';
import { alertAtom } from '@/features/Alert/alert.atom';
import { useTransferWithPermit } from '@/features/MyHoldings/hooks/useTransferWithPermit';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import {
  formatAddress,
  formatAmountWithCommas,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import {
  claimIncentivesDialogAtom,
  ClaimIncentivesFields,
} from '../claimIncentives.utils';

const ClaimIncentivesConfirm: FormFlowStep<ClaimIncentivesFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setAlert = useSetAtom(alertAtom);
  const setClaimIncentivesDialogState = useSetAtom(claimIncentivesDialogAtom);
  // TODO: placeholder
  const { contract } = useTransferWithPermit();

  const onSubmit = async () => {
    setAlert({
      title: 'Claim Incentives Successful',
      description: '',
      type: 'success',
    });

    setClaimIncentivesDialogState({
      open: false,
      claimablePrincipal: null,
      totalAccruedRewards: null,
    });
  };

  return (
    <SoloCard title="Confirm your transaction">
      <form
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
            value={`${parsedForm.current?.claimablePrincipal} ${tokens.kvcm.symbol}`}
          />
          <Input
            readOnly
            label="Total accrued rewards"
            value={formatAmountWithCommas(
              parsedForm.current?.totalAccruedRewards ?? 0
            )}
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
    </SoloCard>
  );
};

export default ClaimIncentivesConfirm;
