import { CurveType } from 'recharts/types/shape/Curve';

const void30 = '#999';

const void60 = '#464646';

export const LINE_PROPS = {
  stroke: void60,
  strokeWidth: 2,
  dot: { r: 4 },
  activeDot: { r: 6 },
  type: 'monotone' as CurveType,
};

export const BAR_PROPS = {
  fill: void30,
  radius: [0, 5, 5, 0] as [number, number, number, number],
  maxBarSize: 16,
};

export const CHART_PROPS = {
  margin: { top: 5, right: 20, left: 10, bottom: 5 },
};

export const X_AXIS_LABEL_PROPS = {
  position: 'insideBottom',
  offset: -5,
};

export const AXIS_PROPS = {
  tick: {
    fontSize: 12,
  },
  tickLine: false,
};

export const Y_AXIS_LABEL_PROPS = {
  angle: -90,
  position: 'insideLeft',
};
