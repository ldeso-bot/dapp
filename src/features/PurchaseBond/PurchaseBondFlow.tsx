import Steps from '@/shared/components/Steps/steps';
import PurchaseBond1Form from './steps/PurchaseBond1Form';
import PurchaseBond2Confirm from './steps/PurchaseBond2Confirm';

export default async function PurchaseBondFlow() {
  return (
    <Steps components={[PurchaseBond1Form, PurchaseBond2Confirm]} data={null} />
  );
}
