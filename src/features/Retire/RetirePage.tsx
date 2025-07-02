'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CarbonPriceCard from "./components/CarbonPriceCard/CarbonPriceCard";
import RetireInfoCard from './components/RetireInfoCard/RetireInfoCard';
import { RetireCarbonFields, retireCarbonSchema } from './retire.constants';
import RetireCarbonForm from "./steps/RetireCarbonForm";

export default function RetirePage() {
  const schema = retireCarbonSchema;
  const form = useForm<RetireCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: '',
      amount: 0,
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <div className="flex flex-col gap-4">
      <RetireInfoCard />
      <div className="flex gap-4 space-between mx-auto max-w-7xl">
        <Steps
          components={[RetireCarbonForm]}
          data={{ form, schema, parsedForm }}
        />
        <CarbonPriceCard />
      </div>
    </div>
  );
}
