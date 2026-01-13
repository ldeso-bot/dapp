'use client';

import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartTooltipItems from '@/shared/components/Tooltip/ChartTooltipItems';
import {
  CHART_PROPS,
  LINE_PROPS,
  X_AXIS_LABEL_PROPS,
  X_AXIS_PROPS,
  Y_AXIS_LABEL_PROPS,
  Y_AXIS_PROPS,
} from '@/shared/constants/chart.constants';
import {
  LAUNCH_DATE,
  ONE_DAY,
  ONE_YEAR,
} from '@/shared/constants/protocol.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import { isToken, Token, tokens } from '@/shared/constants/tokens.constants';
import { Maturity } from '@/shared/models/ProtocolData';
import { formatDate, formatPercentage } from '@/shared/utils/string.utils';
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
  data?: Maturity[];
  yieldField: keyof Maturity;
  tokens: Token[];
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

type YieldRate = Maturity & {
  yieldPercent: number;
  tokens: Token[];
};

export default function YieldRatesCard(props: Props) {
  const { data, yieldField, tokens } = props;
  const nextMaturityTimestamp =
    data && data.length > 0 ? data[0].maturationTimestamp : 0;

  /**
   * Format maturities data for the chart
   */
  const yieldRates: YieldRate[] | undefined = data?.map(
    (maturity): YieldRate => ({
      ...maturity,
      yieldPercent: maturity[yieldField],
      tokens,
    })
  );

  return (
    <Card {...props} skeletonClassName="h-[27.2rem]">
      {!!yieldRates && (
        <>
          <div className="flex flex-row justify-between bg-green-10 p-3">
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
              <LineChart data={yieldRates} {...CHART_PROPS}>
                <XAxis
                  dataKey="index"
                  label={{
                    value: 'Duration',
                    ...X_AXIS_LABEL_PROPS,
                  }}
                  tickFormatter={getDurationFromIndex}
                  ticks={[1, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39]}
                  {...X_AXIS_PROPS}
                />
                <YAxis
                  label={{
                    value: 'Incentives',
                    ...Y_AXIS_LABEL_PROPS,
                  }}
                  tickFormatter={(value) =>
                    formatPercentage(value, { decimals: 0 })
                  }
                  domain={[0, 'dataMax + 0.02']}
                  {...Y_AXIS_PROPS}
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
    const item = payload[0].payload as YieldRate;
    const token = item.tokens.at(0);
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
              label: 'Incentives',
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
