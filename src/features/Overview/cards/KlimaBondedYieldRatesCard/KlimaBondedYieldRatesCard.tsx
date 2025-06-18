'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import { BondYieldRate } from '@/shared/dal/subgraph/klimaBondYieldRates';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function KlimaBondYieldRatesCard(
  props: CardProps & {
    data: BondYieldRate[];
  }
) {
  return (
    <Card
      {...props}
      title="KLIMA Bond Yield Rates"
      tooltip="Historical KLIMA bond yield rates over time"
    >
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={props.data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'Yield (%)', angle: -90, position: 'insideLeft' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Yield']}
              labelFormatter={(label: number) => `Day ${label}`}
            />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
