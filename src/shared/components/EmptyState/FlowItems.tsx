'use client';

import type { FlowItemProps } from '@/shared/utils/emptyState.utils';
import { ArrowForwardIcon } from '../Svg/ArrowForwardIcon';

type FlowItemsProps = {
  flowItems: FlowItemProps[];
};

export const FlowItems = (props: FlowItemsProps) => {
  const { flowItems } = props;
  return (
    <div className="relative flex items-start justify-center gap-4 md:gap-12 my-20 max-w-7xl mx-auto">
      {flowItems.map((item, i) => {
        const ItemIcon = item.icon;
        const defaultBgColor = `bg-secondary/${20 + i * 20}`;
        const defaultGlowColor = `hsl(0 0% 98.5% / ${0.18 + i * 0.1})`;
        return (
          <div
            key={i}
            className="relative flex flex-col items-center gap-3 z-10"
          >
            <div
              className="relative"
              style={{ animationDelay: `${0.6 + i * 0.2}s` }}
            >
              <div
                className="absolute inset-0 rounded-full blur-2xl animate-glow-pulse"
                style={{
                  backgroundColor: item.glowColor || defaultGlowColor,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              <div
                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full ${
                  item.bgColor || defaultBgColor
                } border-2 flex items-center justify-center backdrop-blur-[4px] transition-transform duration-300 hover:scale-110`}
                style={{
                  borderColor: '#00994a20',
                  color: '#00994a',
                }}
              >
                <ItemIcon className="w-9 h-9 md:w-11 md:h-11" />
              </div>
            </div>

            <div
              className="text-center"
              style={{ animationDelay: `${0.8 + i * 0.2}s` }}
            >
              <div className="text-[2.25rem] md:text-[2rem] font-semibold text-foreground mb-2 leading-[1.25] md:leading-tight">
                {item.label}
              </div>

              <div className="text-[0.95rem] md:text-[1.3rem] text-gray-600 leading-relaxed max-w-[180px]">
                {item.sublabel}
              </div>
            </div>

            {i < flowItems.length - 1 && (
              <div
                className="absolute left-[calc(100%+0.5rem)] md:left-[calc(100%+1.5rem)] top-8 md:top-10 animate-fade-in delay-1000"
                style={{ animationDelay: `${1 + i * 0.3}s` }}
              >
                <div
                  className="animate-arrow-flow"
                  style={{ color: '#00994a' }}
                >
                  <ArrowForwardIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
