'use client';

import CarbonClassCard from '@/shared/components/CarbonClassCard/CarbonClassCard';
import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SellCarbonInfoCard from './components/SellCarbonInfoCard/SellCarbonInfoCard';
import { SellCarbonFields, sellCarbonSchema } from './sellCarbon.constants';
import SellCarbonApprove from './steps/SellCarbonApprove';
import SellCarbonForm from './steps/SellCarbonForm';

export default function SellCarbonPage() {
  const schema = sellCarbonSchema;

  const form = useForm<SellCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: '',
      amount: 0,
      slippage: 50,
      token: '',
      carbonClass: ''
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <div className="flex flex-col gap-4">
      <SellCarbonInfoCard />
      <div className="flex gap-4 space-between mx-auto max-w-7xl">
        <Steps
          components={[SellCarbonForm, SellCarbonApprove]}
          data={{ form, schema, parsedForm }}
        />
        <CarbonClassCard />
      </div>
    </div>
  );
}
