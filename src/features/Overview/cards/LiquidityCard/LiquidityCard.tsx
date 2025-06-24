import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartFact from '@/shared/components/ChartFact/ChartFact';
import { AXIS_PROPS, BAR_PROPS } from '@/shared/constants/chart.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmountWithUnits,
  formatPriceUSD,
} from '@/shared/utils/string.utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
export default function LiquidityCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <Card {...props} title="Liquidity" tooltip="There should be a tooltip here">
      {data && (
        <div>
          <div className="flex flex-row gap-10">
            <ChartFact
              label="Market Value"
              value={formatPriceUSD(data.carbonLiquidity.marketValueUSD, 0)}
            />
          </div>
          <div className="w-full h-[212px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.carbonLiquidity.breakdown}>
                <XAxis
                  type="number"
                  tickFormatter={(value) => formatAmountWithUnits(value)}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  width={100}
                  {...AXIS_PROPS}
                />
                <Bar dataKey="valueUSD" {...BAR_PROPS} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
}
