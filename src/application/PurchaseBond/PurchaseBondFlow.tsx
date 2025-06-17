import Steps from '@/shared/components/Steps/steps';
import PurchaseBondForm from './steps/PurchaseBond1Form';
import PurchaseBondConfirm from './steps/PurchaseBond2Confirm';

export default async function PurchaseBondFlow() {
  return (
    <Steps components={[PurchaseBondForm, PurchaseBondConfirm]} data={null} />
  );
}
