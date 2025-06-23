'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import {
  CHART_PROPS,
  LINE_PROPS,
  X_AXIS_LABEL_PROPS,
  X_AXIS_PROPS,
  Y_AXIS_LABEL_PROPS,
  Y_AXIS_PROPS,
} from '@/shared/constants/chart.constants';
import { YieldRates } from '@/shared/models/ProtocolData';
import {
  formatDuration,
  formatDurationLong,
  formatPercentage,
} from '@/shared/utils/string.utils';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import Skeleton from '../Skeleton/Skeleton';
import ChartTooltip from '../Tooltip/ChartTooltip';

type Props = CardProps & {
  data?: YieldRates;
};
export default function YieldRatesCard(props: Props) {
  const { data } = props;

  return (
    <Card {...props}>
      <div className="w-full h-[272px]">
        {!!data && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} {...CHART_PROPS}>
              <XAxis
                dataKey="durationDays"
                label={{
                  value: 'Duration',
                  ...X_AXIS_LABEL_PROPS,
                }}
                tickFormatter={formatDuration}
                {...X_AXIS_PROPS}
              />
              <YAxis
                label={{
                  value: 'Yield',
                  ...Y_AXIS_LABEL_PROPS,
                }}
                tickFormatter={(value) =>
                  formatPercentage(value, { decimals: 0 })
                }
                {...Y_AXIS_PROPS}
              />
              <Tooltip content={YieldChartTooltip} />
              <Line dataKey="yieldPercentage" {...LINE_PROPS} />
            </LineChart>
          </ResponsiveContainer>
        )}
        {!data && <Skeleton className="w-full h-[272px]" />}
      </div>
    </Card>
  );
}

function YieldChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip
        items={[
          { label: 'Duration', value: formatDurationLong(label) },
          {
            label: 'Yield',
            value: formatPercentage(payload[0]?.value, { decimals: 0 }),
          },
        ]}
      />
    );
  }

  return null;
}
