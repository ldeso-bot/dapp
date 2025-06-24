import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartFact from '@/shared/components/ChartFact/ChartFact';
import { AXIS_PROPS, BAR_PROPS } from '@/shared/constants/chart.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmount,
  formatPriceUSD,
  formatTonnes,
} from '@/shared/utils/string.utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function CarbonBackingCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <Card
      {...props}
      title="Carbon Backing"
      tooltip="There should be a tooltip here"
    >
      {data && (
        <>
          <div className="flex flex-row gap-10">
            <ChartFact
              label="Tonnes"
              value={formatAmount(data.carbonBacking.totalTonnes)}
            />
            <ChartFact
              label="Market Value"
              value={formatPriceUSD(data.carbonBacking.marketValueUSD, 0)}
            />
          </div>
          <div className="w-full h-[212px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.carbonBacking.breakdown}>
                <XAxis
                  type="number"
                  tickFormatter={(value) => formatTonnes(value)}
                />
                <YAxis
                  dataKey="label"
                  type="category"
                  width={200}
                  {...AXIS_PROPS}
                />
                <Bar dataKey="value" {...BAR_PROPS} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Card>
  );
}
