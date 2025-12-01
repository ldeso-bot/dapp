'use client';

import ConnectedFeature from '@/shared/components/ConnectedFeature/ConnectedFeature';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/Tabs/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { SUPPORTED_TABS, TabValue } from './constants/tab.constants';
import MyHoldingsModals from './modals/MyHoldingsModals';
import { K2View } from './views/K2View';
import { KvcmView } from './views/KvcmView';
import { LiquidityPositionsView } from './views/LiquidityPositionsView';
import { OverviewView } from './views/OverviewView';

const MyHoldingsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = useMemo((): TabValue => {
    const activeView = searchParams.get('activeView');
    return activeView && SUPPORTED_TABS.includes(activeView as TabValue)
      ? (activeView as TabValue)
      : 'overview';
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('activeView', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="kvcm">kVCM</TabsTrigger>
        <TabsTrigger value="k2">K2</TabsTrigger>
        <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewView />
      </TabsContent>
      <TabsContent className="flex flex-col gap-4" value="kvcm">
        <KvcmView />
      </TabsContent>
      <TabsContent value="k2" className="flex flex-col gap-4">
        <K2View />
      </TabsContent>
      <TabsContent value="liquidity">
        <LiquidityPositionsView />
      </TabsContent>
    </Tabs>
  );
};

const MyHoldingsPage = () => (
  <ConnectedFeature>
    <Suspense>
      <MyHoldingsModals />
      <MyHoldingsTabs />
    </Suspense>
  </ConnectedFeature>
);

export default MyHoldingsPage;
