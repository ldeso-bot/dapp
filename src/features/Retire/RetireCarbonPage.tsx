'use client';

import CarbonClassCard from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import Steps from '@/shared/components/Steps/Steps';
import { CARBONMARK_URL } from '@/shared/constants/urls.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RetireCarbonEmptyState } from './components/RetireCarbonEmptyState';
import { RegenNetworkCreditsCard } from './components/RegenNetworkCreditsCard';
import { RetireCarbonFields, retireCarbonSchema } from './retire.constants';
import RetireCarbonConfirm from './steps/RetireCarbonConfirm';
import RetireCarbonForm from './steps/RetireCarbonForm';

export default function RetirePage() {
  const { data: walletData } = useWalletData();
  const schema = retireCarbonSchema;

  const showEmptyState = (walletData?.balances.kvcm ?? 0) == 0;

  const form = useForm<RetireCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: 'kvcm',
      amountTonnes: 0,
      carbonClass: '',
      carbonCredit: '',
      priceQuotedWei: BigInt(0),
      beneficiaryName: '',
      beneficiaryAddress: '',
      retirementMessage: '',
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <>
      {showEmptyState ? (
        <RetireCarbonEmptyState />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <PageTitle>Retire Carbon</PageTitle>
            <PageDescription>
              Purchase a carbon offset and receive a receipt with proof of
              retirement instantly. Powered by{' '}
              <a
                href={CARBONMARK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 hover:underline"
              >
                Carbonmark
              </a>
              , our partner in carbon retirements.
            </PageDescription>
          </div>
          <div className="flex gap-4 space-between mx-auto">
            <Steps
              components={[RetireCarbonForm, RetireCarbonConfirm]}
              data={{ form, schema, parsedForm }}
            />
            <div className="flex flex-col gap-4">
              <CarbonClassCard />
              <RegenNetworkCreditsCard
                selectedCarbonClassId={form.watch('carbonClass')}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
