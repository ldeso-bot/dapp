import Button from '@/shared/components/Button/Button';
import { TableCell } from '@/shared/components/Table/table';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatPriceUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

type Props = {
  poolInfo: LiquidityPoolInfo;
};
export default function PoolRowMobile({ poolInfo }: Props) {
  return (
    <TableCell>
      <div className="flex flex-col">
        <Pair token={poolInfo.token} description={poolInfo.description} />
        <div className="flex flex-row justify-between">
          <Metric label="TVL" value={formatPriceUSD(poolInfo.tvl)} />
          <Metric label="APY" value={formatPercentage(poolInfo.apyPercent)} />
        </div>
        <div className="flex flex-col gap-1">
          <Button>Deposit Liquidity</Button>
          <Button>Lock Liquidity Tokens</Button>
        </div>
      </div>
    </TableCell>
  );
}
