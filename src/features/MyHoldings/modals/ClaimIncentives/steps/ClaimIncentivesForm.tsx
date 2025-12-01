'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import {
  claimIncentivesDialogAtom,
  ClaimIncentivesFields,
} from '../claimIncentives.utils';

const ClaimIncentivesForm: FormFlowStep<ClaimIncentivesFields> = ({
  next,
  data,
}) => {
  const { form } = data;
  const { handleSubmit, formState } = form;
  const [claimIncentivesDialog, setClaimIncentivesDialog] = useAtom(
    claimIncentivesDialogAtom
  );

  const [principalAmount, setPrincipalAmount] = useState(
    claimIncentivesDialog.claimablePrincipal ?? 0
  );

  const rewardsTransferring = useMemo(() => {
    if (claimIncentivesDialog.claimablePrincipal === 0) return 0;
    return (
      (principalAmount / (claimIncentivesDialog.claimablePrincipal ?? 0)) *
      (claimIncentivesDialog.totalAccruedRewards ?? 0)
    );
  }, [
    principalAmount,
    claimIncentivesDialog.claimablePrincipal,
    claimIncentivesDialog.totalAccruedRewards,
  ]);

  const totalReceived = principalAmount + rewardsTransferring;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= (claimIncentivesDialog.claimablePrincipal ?? 0)
    ) {
      setPrincipalAmount(value);
    }
  };

  // const handleSliderChange = (value: number[]) => {
  //   setPrincipalAmount(value[0]);
  // };

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-size-20 font-semibold text-gray-900">
          Claim Principal + Rewards
        </h2>
        <p className="text-md text-gray-600">
          When you claim principal, accrued rewards transfer with it. Adjust the
          amount below to see how rewards scale proportionally.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <Input
                label="Principal to claim"
                id="principal-amount"
                type="number"
                min={0}
                max={claimIncentivesDialog.claimablePrincipal ?? 0}
                step={0.01}
                {...form.register('claimablePrincipal', {
                  onChange: handleInputChange,
                })}
                error={formState.errors.claimablePrincipal}
                className="flex-1"
              />
              <div className="flex items-center justify-between">
                <Tooltip content="Amount of K2 principal you want to claim from your claimable balance" />
              </div>
              <span className="text-md text-gray-500 whitespace-nowrap mt-[2.5rem]">
                K2
              </span>
            </div>
            {/* <Slider.Root
              value={[principalAmount]}
              onValueChange={handleSliderChange}
              min={0}
              max={claimablePrincipal}
              step={0.01}
              className="w-full"
            /> */}
            {/* <div className="flex justify-between text-sm text-gray-500">
              <span>0 K2</span>
              <span>{fmt(claimablePrincipal) || 0} K2 (max)</span>
            </div> */}
          </div>

          <div className="bg-muted rounded-lg p-4 border border-border my-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-size-14 font-medium text-foreground">
                  Rewards transferring
                </span>
                <Tooltip content="Rewards are transferred proportionally when you claim principal. This is calculated from your total accrued rewards." />
              </div>
              <div className="text-[2.4rem] font-bold text-foreground tabular-nums">
                {formatAmountWithCommas(rewardsTransferring) || 0} K2
              </div>
              <p className="text-size-12 text-muted-foreground">
                {claimIncentivesDialog?.claimablePrincipal &&
                claimIncentivesDialog?.claimablePrincipal > 0
                  ? `${((principalAmount / claimIncentivesDialog.claimablePrincipal) * 100).toFixed(1)}% of total accrued rewards`
                  : 'No rewards available'}
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-size-14 font-medium text-green-900">
                  Total you&apos;ll receive
                </span>
              </div>
              <div className="text-[2.8rem] font-bold text-green-900 tabular-nums">
                {formatAmountWithCommas(totalReceived) || 0} K2
              </div>
              <p className="text-size-12 text-green-700">
                {formatAmountWithCommas(principalAmount) || 0} K2 principal +{' '}
                {formatAmountWithCommas(rewardsTransferring) || 0} K2 rewards
              </p>
            </div>
          </div>
        </div>
        <ButtonGroup>
          <Button colors="secondary" context="flow" type="submit">
            Confirm Claim
          </Button>
          <Button
            colors="primary"
            context="flow"
            disabled={principalAmount <= 0}
            onClick={() =>
              setClaimIncentivesDialog({
                open: false,
                claimablePrincipal: null,
                totalAccruedRewards: null,
              })
            }
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default ClaimIncentivesForm;
