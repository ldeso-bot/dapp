import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartFact from '@/shared/components/ChartFact/ChartFact';
import { Table, TableBody, TableRow } from '@/shared/components/Table/table';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSD } from '@/shared/utils/string.utils';
import PoolRowDesktop from './PoolRowDesktop';
import PoolRowMobile from './PoolRowMobile';

export default function LiquidityPoolsCard(props: CardProps) {
  const { data } = useProtocolData();
  const marketValue =
    data?.liquidityPools.reduce((acc, pool) => acc + pool.tvlUSD, 0) ?? 0;

  return (
    <Card
      {...props}
      title="Liquidity Pools [t038]"
      tooltip="Liquidity pools facilitate the the trade of two tokens via a smart contract. More tokens locked typically enables more efficient execution, with less slippage for users. [t039]"
      skeletonClassName="h-[21.4rem]"
      className="rounded-xl text-text-1"
    >
      {data && (
        <>
          <ChartFact label="TVL" value={formatPriceUSD(marketValue)} />
          <div>
            Users may opt to provide liquidity to support Klima’s infrastructure
            and facilitate carbon execution. Doing so may make participants
            eligible for programmatic protocol incentives. [t040]
          </div>

          <Table>
            <TableBody>
              {data.liquidityPools.map((poolInfo) => (
                <TableRow
                  className="hidden lg:table-row"
                  key={`${poolInfo.token}`}
                >
                  <PoolRowDesktop poolInfo={poolInfo} />
                </TableRow>
              ))}
              {data.liquidityPools.map((poolInfo) => (
                <TableRow className="lg:hidden" key={`${poolInfo.token}`}>
                  <PoolRowMobile poolInfo={poolInfo} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}
