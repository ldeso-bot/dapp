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
        <tbody>
          {data.map((poolInfo) => (
            <tr className="hidden lg:table-row" key={`${poolInfo.id}`}>
              <PoolRowDesktop poolInfo={poolInfo} />
            </tr>
          ))}
          {data.map((poolInfo) => (
            <tr className="lg:hidden" key={`${poolInfo.id}`}>
              <PoolRowMobile poolInfo={poolInfo} />
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
