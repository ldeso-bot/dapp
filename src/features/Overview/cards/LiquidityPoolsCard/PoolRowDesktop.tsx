import Button from '@/shared/components/Button/Button';
import { TableCell } from '@/shared/components/Table/table';
import { tokens } from '@/shared/constants/tokens.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatPriceUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

type Props = {
  poolInfo: LiquidityPoolInfo;
};
export default function PoolRowDesktop({ poolInfo }: Props) {
  return (
    <>
      <TableCell>
        <Pair
          token1={tokens[poolInfo.token1]}
          token2={tokens[poolInfo.token2]}
          description={poolInfo.description}
        />
      </TableCell>
      <TableCell>
        <Metric label="TVL" value={formatPriceUSD(poolInfo.tvl)} />
      </TableCell>
      <TableCell>
        <Metric label="APY" value={formatPercentage(poolInfo.apyPercent)} />
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-3">
          <Button>Deposit Liquidity</Button>
          <Button>Lock Liquidity Tokens</Button>
        </div>
      </TableCell>
    </>
  );
}
