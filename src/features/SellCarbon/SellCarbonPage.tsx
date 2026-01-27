'use client';

import CarbonClassCard from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_SLIPPAGE } from '@/shared/constants/config.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { CarbonSellersHandbookCard } from './components/CarbonSellersHandbookCard';
import { SellCarbonEmptyState } from './components/SellCarbonEmptyState';
import { SellCarbonGettingStarted } from './components/SellCarbonGettingStarted';
import { SellCarbonFields, sellCarbonSchema } from './sellCarbon.constants';
import SellCarbonConfirm from './steps/SellCarbonConfirm';
import SellCarbonForm from './steps/SellCarbonForm';

export default function SellCarbonPage() {
  const schema = sellCarbonSchema;
  const account = useAccount();

  const form = useForm<SellCarbonFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountToSellTonnes: 0,
      kvcmOutQuoteWei: BigInt(0),
      slippage: DEFAULT_SLIPPAGE,
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
            <PageTitle>Supply Carbon</PageTitle>
            <PageDescription>
              Exchange tokenized carbon credits for KVCM.
            </PageDescription>
            <SellCarbonGettingStarted />
          </div>
          <div className="flex gap-4 space-between mx-auto ">
            <Steps
              components={[SellCarbonForm, SellCarbonConfirm]}
              data={{ form, schema, parsedForm }}
            />
            <div className="flex flex-col gap-4">
              <CarbonClassCard />
              <CarbonSellersHandbookCard />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
