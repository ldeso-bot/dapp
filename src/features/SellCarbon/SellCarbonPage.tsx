'use client';

import CarbonClassCard from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { SellCarbonEmptyState } from './components/SellCarbonEmptyState/SellCarbonEmptyState';
import { SellCarbonFields, sellCarbonSchema } from './sellCarbon.constants';
import SellCarbonApprove from './steps/SellCarbonApprove';
import SellCarbonForm from './steps/SellCarbonForm';

export default function SellCarbonPage() {
  const schema = sellCarbonSchema;
  const account = useAccount();

  const form = useForm<SellCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: '',
      amount: 0,
      slippage: 50,
      token: '',
      carbonClass: '',
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <>
      {!account.isConnected ? (
        <SellCarbonEmptyState />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <PageTitle>Sell Carbon</PageTitle>
            <PageDescription>
              Exchange tokenized carbon credits for KVCM.
            </PageDescription>
          </div>
          <div className="flex gap-4 space-between mx-auto max-w-7xl">
            <Steps
              components={[SellCarbonForm, SellCarbonApprove]}
              data={{ form, schema, parsedForm }}
            />
            <CarbonClassCard />
          </div>
        </div>
      )}
    </>
  );
}
