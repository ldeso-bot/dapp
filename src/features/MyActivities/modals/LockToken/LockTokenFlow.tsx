'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { lockTokenDialogAtom, LockTokenFields } from './lockToken.utils';
import { LockTokenForm } from './steps/LockTokenForm';

export default function LockTokenFlow() {
  const lockTokenDialog = useAtomValue(lockTokenDialogAtom);
  const token = lockTokenDialog.token ?? DEFAULT_ALLOCATION_TOKEN;
  const { data: protocolData } = useProtocolData();
  const { data: walletData } = useWalletData();
  const availableBalance = Number(walletData?.balances?.[token] ?? 0);

  const schema = z.object({
    token: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive')
      .lte(availableBalance, 'Amount exceeds available balance'),
    maturityId: z.coerce.number(),
  });

  const form = useForm<LockTokenFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      token,
      amount: 0,
      maturityId: protocolData?.maturities[4]?.maturityId ?? 0,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps components={[LockTokenForm]} data={{ form, schema, parsedForm }} />
  );
}
