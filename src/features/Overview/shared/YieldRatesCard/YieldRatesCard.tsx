'use client';

import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartTooltipItems from '@/shared/components/Tooltip/ChartTooltipItems';
import {
  AXIS_PROPS,
  CHART_PROPS,
  LINE_PROPS,
  X_AXIS_LABEL_PROPS,
  Y_AXIS_LABEL_PROPS,
} from '@/shared/constants/chart.constants';
import {
  LAUNCH_DATE,
  ONE_DAY,
  ONE_YEAR,
} from '@/shared/constants/protocol.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { YieldRates } from '@/shared/models/ProtocolData';
import { formatDate, formatPercentage } from '@/shared/utils/string.utils';
import { isToken } from '@/shared/utils/typeguards';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from '../../../../shared/components/Tooltip/ChartTooltip';

type Props = CardProps & {
  data?: YieldRates;
};

const getDurationFromIndex = (index: number) => {
  if (index >= 3) {
    return `${Math.round((index + 1) / 4)}y`;
  }
  return `${(index + 1) * 90}d`;
};

const formatDateRelative = (timestamp: number) => {
  const duration = Math.max(timestamp - Date.now() / 1000, 0);
  const days = Math.round(duration / ONE_DAY);
  const years = Math.floor(duration / ONE_YEAR);
  const remainingDays = days - years * 365;
  const formatYears = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const formatDays =
    remainingDays > 0
      ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}`
      : '< 1 day';
  return `${formatYears} ${formatDays}`;
};

export default function YieldRatesCard(props: Props) {
  const { data } = props;
  const [nextMaturityTimestamp, setNextMaturityTimestamp] = useState(0);

  useEffect(() => {
    if (!data) return;
    setNextMaturityTimestamp(data[0].maturationTimestamp);
  }, [data]);

  return (
    <Card {...props} skeletonClassName="h-[27.2rem]">
      {!!data && (
        <>
          <div className="flex flex-row justify-between bg-green-10 p-3 rounded-xl">
            <div>
              Resets every <b>90 days</b>. Next reset in{' '}
              {formatDateRelative(nextMaturityTimestamp)} (on:{' '}
              <b>{formatDate(nextMaturityTimestamp)}</b>)
            </div>
            <div>
              Launch date: <b>{formatDate(LAUNCH_DATE)}</b>
            </div>
          </div>
          <div className="w-full h-[27.2rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} {...CHART_PROPS}>
                <XAxis
                  dataKey="index"
                  label={{
                    value: 'Duration',
                    ...X_AXIS_LABEL_PROPS,
                  }}
                  tickFormatter={getDurationFromIndex}
                  ticks={[1, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39]}
                  {...AXIS_PROPS}
                />
                <YAxis
                  label={{
                    value: 'Yield',
                    ...Y_AXIS_LABEL_PROPS,
                  }}
                  tickFormatter={(value) =>
                    formatPercentage(value, { decimals: 0 })
                  }
                  domain={[0, 'dataMax + 0.02']}
                  {...AXIS_PROPS}
                />
                <Tooltip content={YieldChartTooltip} />
                <Line
                  dataKey="yieldPercent"
                  {...LINE_PROPS}
                  animationDuration={100}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Card>
  );
}

function YieldChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    console.log(payload);
    const token = item.token;
    if (!isToken(token)) return null;

    const tokenInfo = tokens[token];

    const buttonText = `Lock ${tokenInfo.symbol} Now`;
    const buttonHref = `${ROUTES.MY_HOLDINGS}?action=lock_${token}&maturityId=${item.index}`;

    return (
      <ChartTooltip>
        <ChartTooltipItems
          items={[
            {
              label: 'Lock Duration',
              value: formatDateRelative(item.maturationTimestamp),
            },
            {
              label: 'Yield',
              value: formatPercentage(item.yieldPercent, { decimals: 0 }),
            },
            {
              label: 'Maturity Date',
              value: formatDate(item.maturationTimestamp),
            },
          ]}
        />
        <Button className="p-3 pointer-events-auto" href={buttonHref}>
          {buttonText}
        </Button>
      </ChartTooltip>
    );
  }

  return null;
}
