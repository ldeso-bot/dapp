import { CurveType } from 'recharts/types/shape/Curve';

export const LINE_PROPS = {
  stroke: '#000',
  strokeWidth: 2,
  dot: { r: 4 },
  activeDot: { r: 6 },
  type: 'monotone' as CurveType,
};

export const CHART_PROPS = {
  margin: { top: 5, right: 20, left: 10, bottom: 5 },
};

export const X_AXIS_LABEL_PROPS = {
  position: 'insideBottom',
  offset: -5,
};
export const X_AXIS_PROPS = {
  tick: {
    fontSize: 12,
  },
  tickLine: false,
};
export const Y_AXIS_LABEL_PROPS = {
  angle: -90,
  position: 'insideLeft',
};
export const Y_AXIS_PROPS = {
  tick: {
    fontSize: 12,
  },
  tickLine: false,
  domain: ['auto', 'auto'],
};
