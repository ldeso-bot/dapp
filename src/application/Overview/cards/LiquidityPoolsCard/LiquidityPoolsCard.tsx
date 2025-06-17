import Card, { CardProps } from '@/shared/components/Card/Card';
import { getLiquidityPools } from '@/shared/dal/subgraph/getLiquidityPools';
import PoolRowDesktop from './PoolRowDesktop';
import PoolRowMobile from './PoolRowMobile';

export default async function LiquidityPoolsCard(props: CardProps) {
  const data = await getLiquidityPools();
  return (
    <Card
      {...props}
      title="Liquidity Pools"
      tooltip="A liquidity pool is a collection of cryptocurrency tokens or assets locked in a smart contract, facilitating decentralized trading and providing liquidity for users to swap tokens on decentralized exchanges. Learn more"
    >
      <div>
        You can use Aerodrome to deposit liquidity into a pool and use those LPs
        for this transaction, allowing you to earn even higher rewards. Learn
        more.
      </div>

      <table className="table-auto">
        {data.map((poolInfo) => (
          <>
            <PoolRowDesktop
              key={poolInfo.id}
              poolInfo={poolInfo}
              className="hidden lg:table-row"
            />
            <PoolRowMobile
              key={poolInfo.id}
              poolInfo={poolInfo}
              className="lg:hidden"
            />
          </>
        ))}
      </table>
    </Card>
  );
}
