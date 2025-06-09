import Steps from '@/shared/components/Steps/steps';
import PurchaseBondConfirm from './steps/PurchaseBondConfirm';
import PurchaseBondForm from './steps/PurchaseBondForm';

export default async function PurchaseBondFlow() {
  return (
    <Steps components={[PurchaseBondForm, PurchaseBondConfirm]} data={null} />
  );
}
