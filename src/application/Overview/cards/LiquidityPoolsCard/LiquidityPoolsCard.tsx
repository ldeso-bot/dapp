import Card, { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { getLiquidityPools } from '@/shared/dal/subgraph/getLiquidityPools';
import { formatPercentage, formatUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

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
        {data.map((pool) => (
          <tr key={pool.id}>
            <td>
              <Pair
                token1={tokens[pool.token1]}
                token2={tokens[pool.token2]}
                description={pool.description}
              />
            </td>
            <td>
              <Metric label="TVL" value={formatUSD(pool.tvl)} />
            </td>
            <td>
              <Metric label="APY" value={formatPercentage(pool.apy)} />
            </td>
          </tr>
        ))}
      </table>
    </Card>
  );
}
