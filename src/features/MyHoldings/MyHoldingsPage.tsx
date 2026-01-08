'use client';

import { Suspense } from 'react';
import { MyHoldingsModals } from './modals/MyHoldingsModals';
import { MyHoldingsTabs } from './shared/MyHoldingsTabs';

const MyHoldingsPage = () => (
  <Suspense>
    <MyHoldingsModals />
    <MyHoldingsTabs />
  </Suspense>
);

export default MyHoldingsPage;
