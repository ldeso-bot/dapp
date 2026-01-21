'use client';

import { Suspense } from 'react';
import { MyHoldingsModals } from './modals/MyHoldingsModals';
import { MyHoldingsTabs } from './shared/MyHoldingsTabs';

const MyHoldingsPage = () => (
  <>
    <MyHoldingsModals />
    <Suspense fallback={<div className="h-[50vh]" />}>
      <MyHoldingsTabs />
    </Suspense>
  </>
);

export default MyHoldingsPage;
