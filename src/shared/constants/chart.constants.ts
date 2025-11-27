import { XAxisProps, YAxisProps } from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import { BaseAxisProps } from 'recharts/types/util/types';

const void30 = '#999';
const void60 = '#464646';
const green60 = '#00c52d';
const black = '#000';

export const LINE_PROPS = {
  stroke: void60,
  strokeWidth: 2,
  dot: { r: 6, fill: green60, stroke: '' },
  activeDot: { r: 6, fill: green60, stroke: black },
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

type TextAnchor = 'end' | 'start';
const AXIS_PROPS: BaseAxisProps = {
  tick: {
    fontSize: 12,
  },
  tickLine: false,
};

export const X_AXIS_PROPS: XAxisProps = {
  ...AXIS_PROPS,
  angle: -45,
  textAnchor: 'end' as TextAnchor,
};

export const Y_AXIS_PROPS: YAxisProps = {
  ...AXIS_PROPS,
};

export const Y_AXIS_LABEL_PROPS = {
  angle: -90,
  position: 'insideLeft',
};
