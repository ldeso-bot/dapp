'use client';

import Button from '@/shared/components/Button/Button';
import { QuoteType } from '@/shared/components/CarbonClassCard/CarbonClassCard';
import Card, { CardProps } from '@/shared/components/Card/Card';
import { BAR_PROPS, Y_AXIS_PROPS } from '@/shared/constants/chart.constants';
import { useExecutionRates } from '@/shared/hooks/api/useExecutionRates';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { calculateLogScaleConfig } from '@/shared/utils/chart.utils';
import {
  formatAmountWithUnits,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type MergedClass = {
  carbonClassId: string;
  name: string;
  usdcPerTonne: number;
  supplyTonnes: number;
};

export default function CarbonMarketCard(props: CardProps) {
  const [quoteType, setQuoteType] = useState<QuoteType>(QuoteType.retire);
  const [tonnage] = useState<number>(1);

  const { data: protocolData, isLoading: protocolLoading } = useProtocolData();
  const { data: quotes, isLoading: quotesLoading } =
    useExecutionRates(quoteType);

  const isLoading = protocolLoading || quotesLoading;

  // Merge quote data with protocol data. Only include classes where both
  // carbonClassId matches AND usdcPerTonne > 0. For example, an empty class will have a valid sell price, but an invalid retire price.
  const mergedClasses: MergedClass[] = (() => {
    if (!protocolData?.carbonClasses || !quotes) return [];
    const quotesMap = new Map(quotes.map((q) => [q.carbonClassId, q]));
    return protocolData.carbonClasses
      .filter((c) => {
        const quote = quotesMap.get(c.carbonClassId);
        return quote != null && quote.usdcPerTonne > 0;
      })
      .map((c) => ({
        carbonClassId: c.carbonClassId,
        name: c.name,
        usdcPerTonne: quotesMap.get(c.carbonClassId)!.usdcPerTonne,
        supplyTonnes: c.supplyTonnes,
      }))
      .sort((a, b) => b.usdcPerTonne - a.usdcPerTonne);
  })();

  const priceChartConfig = calculateLogScaleConfig(
    mergedClasses,
    'usdcPerTonne'
  );
  const capacityChartConfig = calculateLogScaleConfig(
    mergedClasses,
    'supplyTonnes'
  );

  const priceLabel =
    quoteType === QuoteType.retire
      ? `Execution rate (${tonnage} tCO₂e)`
      : `Execution rate (${tonnage} tCO₂e)`;

  return (
    <Card
      {...props}
      title="Carbon Market"
      tooltip="Execution rates are indicative only and may change at the time of execution due to protocol conditions. Any USD references are illustrative and provided for convenience."
      className="rounded-xl"
    >
      {/* Retire / Swap toggle */}
      <div className="flex flex-row gap-2 mb-3">
        <Button
          colors={quoteType === QuoteType.retire ? 'secondary' : 'primary'}
          onClick={() => setQuoteType(QuoteType.retire)}
        >
          Retire Carbon
        </Button>
        <Button
          colors={quoteType === QuoteType.swap ? 'secondary' : 'primary'}
          onClick={() => setQuoteType(QuoteType.swap)}
        >
          Supply Carbon
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-row justify-center items-center h-full">
          <div className="text-size-14 text-void-50">Loading...</div>
        </div>
      )}

      {!isLoading && mergedClasses.length > 0 && (
        <div>
          <div className="flex flex-row text-size-12 text-void-60 text-center">
            <div className="w-full grow">{priceLabel}</div>
            <div className="w-[20rem]"></div>
            <div className="w-full grow">Available Supply (tCO₂e)</div>
          </div>
          <div className="flex flex-row">
            {/* Price Chart */}
            <div className="w-full h-[21.2rem] grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={mergedClasses}>
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
                  <Bar dataKey="usdcPerTonne" {...BAR_PROPS} />
                  <Tooltip
                    cursor={{ fill: 'rgba(55, 65, 81, 0)' }}
                    formatter={(value) => [
                      `${formatPriceUSDWithCommas(Number(value), 'auto')}`,
                      priceLabel,
                    ]}
                    labelFormatter={() => ''}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Class name labels */}
            <div className="w-[200] h-[21.2rem]">
              <BarChart
                layout="vertical"
                data={mergedClasses}
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
            {/* Supply Chart */}
            <div className="w-full h-[21.2rem] grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={mergedClasses}>
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

      {!isLoading && mergedClasses.length === 0 && (
        <div className="flex flex-row justify-center items-center h-full">
          <div className="text-size-14 text-void-50">Coming soon</div>
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
