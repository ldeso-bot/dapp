'use client';

import { ROUTES } from '@/shared/constants/route.constants';
import { type InfoCardsProps } from '@/shared/utils/emptyState.utils';
import Link from 'next/link';
import { ArrowForwardIcon } from '../Svg/ArrowForwardIcon';

export const InfoCards = (props: InfoCardsProps) => {
  const { title, description, cards, showSteps } = props;
  return (
    <div id="benefits" className="mx-auto px-4 pb-20 md:pb-24">
      <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
        <h2 className="text-7xl font-bold mb-6 md:mb-8">{title}</h2>
        <p className="text-size-20 text-text-2 max-w-5xl mx-auto leading-tight">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {cards.map((card, i) => {
          const CardIcon = card.icon;
          return (
            <div
              key={i}
              className="relative group h-full animate-slide-up"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="bg-surface-1 relative h-full p-10 md:p-12 rounded-2xl border border-border-subtle hover:border-[#00994a]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2 cursor-pointer flex flex-col">
                <div className="mb-6 group-hover:animate-icon-rotate">
                  <div className="w-16 h-16 rounded-2xl bg-[#00994a]/10 border border-border-subtle/20 flex items-center justify-center">
                    <CardIcon className="w-8 h-8 fill-[#00994a]" />
                  </div>
                </div>
                {showSteps && (
                  <div className="absolute -top-[1rem] -right-[1rem] mb-2">
                    <div className="w-4 h-4 p-6 bg-[#00994a] rounded-full flex items-center justify-center">
                      <span className="text-size-18 font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                )}
                <h3 className="text-4xl font-bold mb-4 md:mb-6">
                  {card.title}
                </h3>
                <p className="text-2xl text-text-2 flex-1 leading-relaxed">
                  {card.description}
                </p>
                {card?.cta && (
                  <Link
                    href={`${ROUTES.MY_ACTIVITIES}?activeView=${card?.cta?.activeView ?? 'overview'}`}
                    className="mt-4 h-10 px-6 hover:scale-105 transition-transform bg-surface-2 border-none inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-size-14 font-medium whitespace-nowrap">
                      {card.cta.text}
                    </span>
                    <ArrowForwardIcon className="w-4 h-4 shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
