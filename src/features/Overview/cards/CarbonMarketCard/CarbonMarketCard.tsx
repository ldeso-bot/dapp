import Card, { CardProps } from '@/shared/components/Card/Card';
import { BAR_PROPS, Y_AXIS_PROPS } from '@/shared/constants/chart.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { calculateLogScaleConfig } from '@/shared/utils/chart.utils';
import {
  formatAmountWithUnits,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function CarbonMarketCard(props: CardProps) {
  const { data } = useProtocolData();

  /** TODO: Show only carbon classes with valueUSD, */
  const carbonClasses = data?.carbonClasses.filter((a) => a.valueUSD);

  // Calculate domain and ticks for price chart
  const priceChartConfig = calculateLogScaleConfig(
    carbonClasses || [],
    'valueUSD'
  );

  // Calculate domain and ticks for capacity chart
  const capacityChartConfig = calculateLogScaleConfig(
    carbonClasses || [],
    'supplyTonnes'
  );
  console.log(priceChartConfig);

  return (
    <Card
      {...props}
      title="Carbon Market"
      tooltip="Execution rates are indicative only and may change at the time of execution due to protocol conditions. Any USD references are illustrative and provided for convenience."
      className="rounded-xl"
    >
      {carbonClasses && (
        <div>
          {/* Titles*/}
          <div className="flex flex-row text-size-12 text-void-60 text-center">
            <div className="w-full grow-1">Price</div>
            <div className="w-[20rem]"></div>
            <div className="w-full grow-1">Available Supply (tCO₂e)</div>
          </div>
          {/* Charts */}
          <div className="flex flex-row">
            {/* Price Chart*/}
            <div className="w-full h-[21.2rem] grow-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={carbonClasses}>
                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      formatPriceUSDWithCommas(Number(value), 'auto')
                    }
                    ticks={priceChartConfig.ticks}
                    reversed
                    scale="log"
                    domain={priceChartConfig.domain}
                  />
                  <YAxis
                    type="category"
                    width={1}
                    orientation="right"
                    {...Y_AXIS_PROPS}
                  />
                  <Bar dataKey="valueUSD" {...BAR_PROPS} />
                  <Tooltip
                    cursor={{ fill: 'rgba(55, 65, 81, 0)' }}
                    formatter={(value) => [
                      `${formatPriceUSDWithCommas(Number(value), 'auto')}`,
                      'Price',
                    ]}
                    labelFormatter={() => ''}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Labels */}
            <div className="w-[200] h-[21.2rem]">
              <BarChart
                layout="vertical"
                data={carbonClasses}
                height={212}
                width={200}
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  width={200}
                  {...Y_AXIS_PROPS}
                  axisLine={false}
                  tick={yAxisLabelsFormatter}
                />
                <XAxis />
              </BarChart>
            </div>
            {/* Capacity Chart*/}
            <div className="w-full h-[21.2rem] grow-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={carbonClasses}>
                  <XAxis
                    type="number"
                    tickFormatter={(value) => formatAmountWithUnits(value)}
                    scale="log"
                    domain={capacityChartConfig.domain}
                    ticks={capacityChartConfig.ticks}
                  />
                  <YAxis type="category" width={1} {...Y_AXIS_PROPS} />
                  <Bar dataKey="supplyTonnes" {...BAR_PROPS} />
                  <Tooltip
                    cursor={{ fill: 'rgba(55, 65, 81, 0)' }}
                    formatter={(value) => [
                      `${formatAmountWithUnits(Number(value))}T`,
                      'Supply',
                    ]}
                    labelFormatter={() => ''}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

const yAxisLabelsFormatter = (props: {
  height: number;
  width: number;
  x: number;
  y: number;
  payload: { value: string };
}) => {
  // Simple word wrapping to minimize lines while staying within bounds
  const wrapText = (text: string, maxWidth: number = 180): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      // Rough estimate: ~6px per character at font-size 12
      const estimatedWidth = testLine.length * 6;

      if (estimatedWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const lines = wrapText(props.payload.value);

  // Calculate vertical centering offset based on number of lines
  const centerOffset = lines.length > 1 ? ((lines.length - 1) * 14 - 8) / 2 : 0;

  return (
    <g transform={`translate(${-props.width / 2}, 0)`}>
      <text
        orientation="right"
        stroke="none"
        fontSize="12"
        x={props.x + 100}
        y={props.y - centerOffset}
        textAnchor="middle"
        fill="#666"
      >
        {lines.map((line, index) => (
          <tspan key={index} x="204" dy={`${index === 0 ? 0 : 14}px`}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

/*
<g transform={`translate(${props.width / 2}, 0)`}>*/
