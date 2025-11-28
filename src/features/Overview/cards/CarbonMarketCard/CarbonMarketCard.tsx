import Card, { CardProps } from '@/shared/components/Card/Card';
import { BAR_PROPS, Y_AXIS_PROPS } from '@/shared/constants/chart.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatAmountWithUnits } from '@/shared/utils/string.utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function CarbonMarketCard(props: CardProps) {
  const { data } = useProtocolData();

  const carbonClasses = data?.carbonClasses.filter((a) => a.valueUSD);

  return (
    <Card
      {...props}
      title="Carbon Market"
      tooltip="There should be a tooltip here"
    >
      {carbonClasses && (
        <div>
          {/* Titles*/}
          <div className="flex flex-row text-size-12 text-void-60 text-center">
            <div className="w-full grow-1">Price</div>
            <div className="w-[20rem]"></div>
            <div className="w-full grow-1">Capacity</div>
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
                      `$${formatAmountWithUnits(value)}`
                    }
                    ticks={[0.1, 1, 10]}
                    reversed
                    scale="log"
                    domain={[0.1, 10]}
                  />
                  <YAxis
                    type="category"
                    width={1}
                    orientation="right"
                    {...Y_AXIS_PROPS}
                  />
                  <Bar dataKey="priceUSD" {...BAR_PROPS} />0
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
                  tick={tickFormatter}
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
                    domain={[900, 100000000]}
                    ticks={[1000, 10000, 100000, 1000000, 10000000, 100000000]}
                  />
                  <YAxis type="category" width={1} {...Y_AXIS_PROPS} />
                  <Bar dataKey="supplyTonnes" {...BAR_PROPS} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

const tickFormatter = (props: {
  height: number;
  width: number;
  x: number;
  y: number;
  payload: { value: string };
}) => {
  return (
    <g transform={`translate(${-props.width / 2}, 0)`}>
      <text
        orientation="right"
        stroke="none"
        fontSize="12"
        x={props.x + 100}
        y={props.y}
        textAnchor="middle"
        fill="#666"
      >
        <tspan x="204" dy="0.355em">
          {props.payload.value}
        </tspan>
      </text>
    </g>
  );
};

/*
<g transform={`translate(${props.width / 2}, 0)`}>*/
