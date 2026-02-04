'use client';

import { Suspense } from 'react';
import { MyActivitiesModals } from './modals/MyActivitiesModals';
import { MyActivitiesTabs } from './shared/MyActivitiesTabs';

const MyActivitiesPage = () => (
  <>
    <MyActivitiesModals />
    <Suspense fallback={<div className="h-[50vh]" />}>
      <MyActivitiesTabs />
    </Suspense>
  </>
);

export default MyActivitiesPage;
