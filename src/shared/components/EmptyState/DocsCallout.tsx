'use client';

import type { DocsCalloutProps } from '@/shared/utils/emptyState.utils';
import { OpenInNewIcon } from '../Svg/OpenInNewIcon';

export const DocsCallout = (props: DocsCalloutProps) => {
  const { title, description, href, icon } = props;
  return (
    <div className="w-full mx-auto px-4 pb-20 md:pb-24 animate-slide-up delay-400">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#fff] via-[#fff] to-[#00994a]/5 p-8 md:p-12 hover:border-[#00994a]/50 transition-all duration-300">
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="shrink-0 group-hover:animate-icon-rotate">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00994a]/10 border border-[#00994a]/20 flex items-center justify-center group-hover:bg-[#00994a]/20 transition-colors">
                {(() => {
                  const DocsIcon = icon;
                  return (
                    <div className="text-[#00994a]">
                      <DocsIcon className="w-8 h-8 md:w-10 md:h-10 fill-[#00994a]" />
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-bold mb-2 group-hover:text-[#00994a] transition-colors">
                {title}
              </h3>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#00994a]/10 flex items-center justify-center transition-colors">
                <OpenInNewIcon className="w-5 h-5 text-muted-foreground group-hover:text-[#00994a] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
