'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodBoolean, ZodRecord, ZodString } from 'zod';
import UnlockTokenConfirm from './steps/UnlockTokenConfirm';
import UnlockTokenForm from './steps/UnlockTokenForm';
import { UnlockTokenFields } from './unlockToken.utils';

export default function UnlockTokenFlow() {
  const { data } = useWalletData();

  // Form and schema are defined at the flow level
  const schemaObj: {
    proportional: ZodBoolean;
    options: ZodRecord<ZodString, ZodBoolean>;
  } = {
    proportional: z.coerce.boolean(),
    options: z.record(z.string(), z.boolean()),
  };
  const defaultValues: {
    options: Record<string, boolean>;
    proportional: boolean;
  } = {
    proportional: true,
    options: {},
  };
  data?.allocations.forEach((allocation) => {
    defaultValues.options[allocation.id] = false;
  });

  const schema = z.object(schemaObj);

  const form = useForm<UnlockTokenFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step
  return (
    <Steps
      components={[UnlockTokenForm, UnlockTokenConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
