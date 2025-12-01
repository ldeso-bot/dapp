'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  claimIncentivesDialogAtom,
  ClaimIncentivesFields,
} from './claimIncentives.utils';
import ClaimIncentivesConfirm from './steps/ClaimIncentivesConfirm';
import ClaimIncentivesForm from './steps/ClaimIncentivesForm';

export default function ClaimIncentivesFlow() {
  const claimIncentivesDialog = useAtomValue(claimIncentivesDialogAtom);

  // Form and schema are deffined at the flow level
  const schema = z.object({
    claimablePrincipal: z.coerce.number(),
    totalAccruedRewards: z.coerce.number(),
  });

  const form = useForm<ClaimIncentivesFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      claimablePrincipal: claimIncentivesDialog.claimablePrincipal ?? 0,
      totalAccruedRewards: claimIncentivesDialog.totalAccruedRewards ?? 0,
    },
  });

  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[ClaimIncentivesForm, ClaimIncentivesConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
