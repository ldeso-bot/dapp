'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/Tabs/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { HoldingsTabValue, SUPPORTED_TABS } from '../constants/tab.constants';
import { K2View } from '../views/K2View/K2View';
import { KvcmView } from '../views/KVCMView/KvcmView';
import { LiquidityPositionsView } from '../views/LiquidityPositionsView/LiquidityPositionView';
import { OverviewView } from '../views/OverviewView/OverviewView';

const tabClassName = 'py-4 px-3 text-size-14 font-medium rounded-full';

export const MyHoldingsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = useMemo((): HoldingsTabValue => {
    const activeView = searchParams.get('activeView');
    return activeView && SUPPORTED_TABS.includes(activeView as HoldingsTabValue)
      ? (activeView as HoldingsTabValue)
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
        <TabsTrigger className={tabClassName} value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="kvcm">
          kVCM
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="k2">
          K2
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="liquidity">
          Liquidity
        </TabsTrigger>
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
