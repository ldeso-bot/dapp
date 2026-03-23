'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/Tabs/Tabs';
import { DEV_MODE } from '@/shared/constants/config.constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { ActivitiesTabValue, SUPPORTED_TABS } from '../constants/tab.constants';
import { K2View } from '../views/K2View/K2View';
import { KvcmView } from '../views/KVCMView/KvcmView';
import { LiquidityPositionsView } from '../views/LiquidityPositionsView/LiquidityPositionView';
import { OverviewView } from '../views/OverviewView/OverviewView';
import { TestView } from '../views/TestView/TestView';

const tabClassName =
  'py-4 px-3 text-size-14 text-text-1 font-medium rounded-full';

export const MyActivitiesTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentTab = useMemo((): ActivitiesTabValue => {
    const activeView = searchParams.get('activeView');
    return activeView &&
      SUPPORTED_TABS.includes(activeView as ActivitiesTabValue)
      ? (activeView as ActivitiesTabValue)
      : 'overview';
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('activeView', value);
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger className={tabClassName} value="overview">
          Overview [t214]
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="kvcm">
          kVCM [t215]
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="k2">
          K2 [t216]
        </TabsTrigger>
        <TabsTrigger className={tabClassName} value="liquidity">
          Liquidity [t217]
        </TabsTrigger>
        {DEV_MODE && (
          <TabsTrigger className={tabClassName} value="test">
            Test
          </TabsTrigger>
        )}
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
      <TabsContent value="test">
        <TestView />
      </TabsContent>
    </Tabs>
  );
};
