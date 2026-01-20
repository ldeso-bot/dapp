'use client';

import Steps from '@/shared/components/Steps/Steps';
import ClaimIncentivesForm from './steps/ClaimIncentivesForm';

export default function ClaimIncentivesFlow() {
  return <Steps components={[ClaimIncentivesForm]} data={{}} />;
}
