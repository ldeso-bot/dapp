import { YAxisProps } from 'recharts';
import { BaseAxisProps } from 'recharts/types/util/types';

const void30 = '#999';
const void60 = '#464646';
const green60 = '#00c52d';
const black = '#000';

export const BAR_PROPS = {
  fill: void30,
  radius: [0, 5, 5, 0] as [number, number, number, number],
  maxBarSize: 16,
};

type TextAnchor = 'end' | 'start';
const AXIS_PROPS: BaseAxisProps = {
  tick: {
    fontSize: 12,
  },
  tickLine: false,
};

export const Y_AXIS_PROPS: YAxisProps = {
  ...AXIS_PROPS,
};