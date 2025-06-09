import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';

export default async function PurchaseBondPage() {
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      <div className="flex flex-col gap-3 w-full">
        <Button colors="primary" context="flow">
          Bond Klima
        </Button>
        <Button colors="secondary" context="flow">
          Bond Klima
        </Button>
      </div>
    </Card>
  );
}
