'use client';

import CarbonClassCard from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RetireCarbonFields, retireCarbonSchema } from './retire.constants';
import RetireCarbonConfirm from './steps/RetireCarbonConfirm';
import RetireCarbonForm from './steps/RetireCarbonForm';

export default function RetirePage() {
  const schema = retireCarbonSchema;
  const form = useForm<RetireCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: '',
      amount: 0,
      carbonClass: '',
      carbonCredit: '',
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <PageTitle>Retire Carbon</PageTitle>
        <PageDescription>
          Purchase a carbon offset and receive a receipt with proof of
          retirement instantly. Powered by Carbonmark, our partner in carbon
          retirements.
        </PageDescription>
      </div>
      <div className="flex gap-4 space-between mx-auto max-w-7xl">
        <Steps
          components={[RetireCarbonForm, RetireCarbonConfirm]}
          data={{ form, schema, parsedForm }}
        />
        <CarbonClassCard />
      </div>
    </div>
  );
}
