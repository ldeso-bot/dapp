'use client';

import SoloCard from '@/shared/components/Card/SoloCard';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shared/components/Table/table';
import { useCarbonCategories } from '@/shared/hooks/web3/useCarbonCategories';
import { formatPriceUSD } from '@/shared/utils/string.utils';

type Props = {
  className?: string;
};

const CarbonClassesCard: React.FC<Props> = ({ className }) => {
  const { categories } = useCarbonCategories();

  return (
    <SoloCard title="Carbon Classes" className={className}>
      {categories && (
        <Table>
          <TableBody borders="between">
            {categories.map((category) => (
              <TableRow key={category.name}>
                <TableCell
                  key={category.name}
                  className="flex flex-col gap-2 max-w-full whitespace-normal"
                >
                  <div className="text-size-16 font-bold text-void-50">
                    {category.name}
                  </div>
                  {category.carbonClasses.map((carbonClass) => (
                    <div
                      key={carbonClass.name}
                      className="flex flex-row gap-2 justify-between text-size-14 text-void-80"
                    >
                      <div>{carbonClass.name}</div>
                      <div className="font-bold">
                        {formatPriceUSD(carbonClass.priceUSD)}
                      </div>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SoloCard>
  );
};

export default CarbonClassesCard;
