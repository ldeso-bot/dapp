'use client';

import CarbonClassCard, {
  QuoteType,
} from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import Steps from '@/shared/components/Steps/Steps';
import { CARBONMARK_URL } from '@/shared/constants/urls.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { RegenNetworkCreditsCard } from './components/RegenNetworkCreditsCard';
import { RetireCarbonEmptyState } from './components/RetireCarbonEmptyState';
import { RetirementHistoryCard } from './components/RetirementHistoryCard';
import { RetireCarbonFields, retireCarbonSchema } from './retire.constants';
import RetireCarbonConfirm from './steps/RetireCarbonConfirm';
import RetireCarbonForm from './steps/RetireCarbonForm';

export default function RetirePage() {
  const { address } = useAccount();
  const showEmptyState = !address;
  const schema = retireCarbonSchema;

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

  if (showEmptyState) return <RetireCarbonEmptyState />;

  const retirementHistoryUrl = `https://app.carbonmark.com/retirements/${address}`;

  const details = (
    <>
      <CarbonClassCard quoteType={QuoteType.retire} />
      <RetirementHistoryCard retirementHistoryUrl={retirementHistoryUrl} />
      <RegenNetworkCreditsCard
        selectedCarbonClassId={form.watch('carbonClass')}
      />
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-text-1">
        <PageTitle>Retire Carbon [t090]</PageTitle>
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
          , our partner in carbon retirements. [t091]
        </PageDescription>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row mx-auto w-full max-w-[96rem] justify-center">
        <div className="min-w-0 w-full max-w-full lg:w-[45rem] shrink-0">
          <Steps
            components={[RetireCarbonForm, RetireCarbonConfirm]}
            data={{ form, schema, parsedForm }}
          />
        </div>
        <div className="min-w-0 w-full max-w-full lg:w-[45rem] shrink-0 flex flex-col gap-4">
          {details}
        </div>
      </div>
    </div>
  );
}
