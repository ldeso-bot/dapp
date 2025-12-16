'use client';

import Button from '@/shared/components/Button/Button';
import { ArrowForwardIcon } from '@/shared/components/Svg/ArrowForwardIcon';
import { OpenInNewIcon } from '@/shared/components/Svg/OpenInNewIcon';
import type { EmptyStateProps } from '@/shared/utils/emptyState.utils';

export default function EmptyState({
  title,
  description,
  flowItems,
  cta,
  stats,
  benefitSection,
  docsCallout,
  showParticle = true,
}: EmptyStateProps) {
  const CtaIcon = cta.icon;
  const primaryColor = '#00994a';
  const topographicBackgroundId = 'empty-state-topo';

  return (
    <div className="min-h-screen -m-6">
      <div className="relative">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id={`${topographicBackgroundId}-edge-fade`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--foreground))"
                stopOpacity="1"
              />
              <stop
                offset="90%"
                stopColor="hsl(var(--foreground))"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--foreground))"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <g
            className="opacity-[0.07]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M-50,480 Q100,440 250,460 T500,420 T750,450 T1000,410 T1250,440 T1500,410 T1750,435 T1900,415"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.8"
            />
            <path
              d="M-50,458 Q110,422 260,440 T510,405 T760,432 T1010,398 T1260,422 T1510,395 T1760,418 T1900,400"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.7"
            />
            <path
              d="M-50,436 Q120,402 270,420 T520,388 T770,415 T1020,382 T1270,405 T1520,378 T1770,400 T1900,385"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.6"
            />
            <path
              d="M-50,408 Q140,375 290,392 T540,360 T790,385 T1040,355 T1290,378 T1540,350 T1790,372 T1900,358"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.7"
            />
            <path
              d="M-50,385 Q150,355 300,370 T550,342 T800,365 T1050,338 T1300,358 T1550,332 T1800,352 T1900,340"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.6"
            />
            <path
              d="M-50,362 Q160,335 310,350 T560,322 T810,345 T1060,320 T1310,340 T1560,315 T1810,335 T1900,322"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.5"
            />
            <path
              d="M-50,335 Q180,310 330,322 T580,295 T830,318 T1080,292 T1330,315 T1580,288 T1830,310 T1900,298"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.6"
            />
            <path
              d="M-50,312 Q190,288 340,300 T590,275 T840,298 T1090,272 T1340,295 T1590,268 T1840,290 T1900,278"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.5"
            />
            <path
              d="M-50,290 Q200,268 350,280 T600,255 T850,278 T1100,252 T1350,275 T1600,248 T1850,270 T1900,258"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.5"
            />
            <path
              d="M-50,265 Q220,245 370,255 T620,232 T870,252 T1120,228 T1370,250 T1620,225 T1870,245 T1900,235"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.4"
            />
            <path
              d="M-50,242 Q230,225 380,235 T630,215 T880,232 T1130,210 T1380,230 T1630,205 T1880,225 T1900,215"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.4"
            />
            <path
              d="M-50,220 Q240,205 390,215 T640,195 T890,212 T1140,192 T1390,210 T1640,188 T1890,208 T1900,198"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.35"
            />
            <path
              d="M-50,198 Q260,182 410,192 T660,175 T910,190 T1160,172 T1410,188 T1660,168 T1910,185 T1900,175"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.35"
            />
            <path
              d="M-50,178 Q270,165 420,175 T670,158 T920,172 T1170,155 T1420,170 T1670,152 T1920,168 T1900,158"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.3"
            />
            <path
              d="M-50,158 Q280,148 430,155 T680,140 T930,152 T1180,138 T1430,150 T1680,135 T1930,148 T1900,138"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.3"
            />
            <path
              d="M-50,138 Q300,128 450,135 T700,120 T950,132 T1200,118 T1450,130 T1700,115 T1900,125"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.25"
            />
            <path
              d="M-50,120 Q310,112 460,118 T710,105 T960,115 T1210,102 T1460,112 T1710,98 T1900,108"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.25"
            />
            <path
              d="M-50,102 Q320,95 470,100 T720,88 T970,98 T1220,85 T1470,95 T1720,82 T1900,92"
              stroke={`url(#${topographicBackgroundId}-edge-fade)`}
              strokeWidth="0.2"
            />
          </g>
        </svg>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-50,435.63537 Q120.36463,401.63537 270.36463,419.63537 T520.36463,387.63537 T770.36463,414.63537 T1020.36463,381.63537 T1270.36463,404.63537 T1520.36463,377.63537 T1770.36463,399.63537 T1900,384.63537"
            stroke={primaryColor}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            className="opacity-15"
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="text-center max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in-up">
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-[7rem] font-bold leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#2b2b2b] to-[#00994a]">
                {title}
              </h1>
              <p className="text-[2.2rem] text-gray-600 max-w-5xl mx-auto leading-tight">
                {description}
              </p>
            </div>
            <div className="relative flex items-start justify-center gap-4 md:gap-12 my-20 max-w-7xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00994a]/20 to-transparent"
                  style={
                    {
                      '--tw-gradient-from': 'transparent',
                      '--tw-gradient-via': `${primaryColor}20`,
                      '--tw-gradient-to': 'transparent',
                    } as React.CSSProperties
                  }
                />
              </div>

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
                          borderColor: `${primaryColor}20`,
                          color: primaryColor,
                        }}
                      >
                        <ItemIcon className="w-9 h-9 md:w-11 md:h-11" />
                      </div>
                    </div>
                    <div
                      className="text-center"
                      style={{ animationDelay: `${0.8 + i * 0.2}s` }}
                    >
                      <div className="text-size-18 font-semibold text-foreground mb-2">
                        {item.label}
                      </div>
                      <div className="text-size-12 text-gray-600 leading-relaxed max-w-[160px]">
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
                          style={{ color: primaryColor }}
                        >
                          <ArrowForwardIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {showParticle && (
                <div
                  className="absolute w-2 h-2 rounded-full animate-particle-flow"
                  style={{
                    left: '10%',
                    top: '50%',
                    backgroundColor: primaryColor,
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="transition-all duration-200">
                <Button
                  onClick={cta.onClick}
                  className="h-14 px-6 gap-3 hover:scale-105 transition-transform bg-foreground text-white"
                >
                  <CtaIcon className="w-5 h-5" />
                  <span className="text-size-16">{cta.text}</span>
                  <ArrowForwardIcon className="w-4 h-4" />
                </Button>
              </div>
              {cta.description && (
                <p className="text-size-14 text-gray-600">{cta.description}</p>
              )}
            </div>
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8 pt-8 border-t border-[#f0f0f0]/60">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="text-5xl font-bold"
                      style={{ color: primaryColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xl text-gray-600 mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {(benefitSection || docsCallout) && (
        <div className="px-16">
          {benefitSection && (
            <div id="benefits" className="mx-auto px-4 pb-20 md:pb-24">
              <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
                <h2 className="text-7xl font-bold mb-6 md:mb-8">
                  {benefitSection.title}
                </h2>
                <p className="text-size-20 text-gray-600 max-w-5xl mx-auto leading-tight">
                  {benefitSection.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                {benefitSection.cards.map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <div
                      key={i}
                      className="relative group h-full animate-slide-up"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <div className="bg-white relative h-full p-10 md:p-12 rounded-2xl border border-gray-100 hover:border-[#00994a]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2 cursor-pointer flex flex-col">
                        <div className="mb-6 group-hover:animate-icon-rotate">
                          <div className="w-16 h-16 rounded-2xl bg-[#00994a]/10 border border-gray-100/20 flex items-center justify-center">
                            <CardIcon className="w-8 h-8 fill-[#00994a]" />
                          </div>
                        </div>
                        <h3 className="text-4xl font-bold mb-4 md:mb-6">
                          {card.title}
                        </h3>
                        <p className="text-2xl text-gray-600 flex-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {docsCallout && (
            <div className="w-full mx-auto px-4 pb-20 md:pb-24 animate-slide-up delay-400">
              <a
                href={docsCallout.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#fff] via-[#fff] to-[#00994a]/5 p-8 md:p-12 hover:border-[#00994a]/50 transition-all duration-300">
                  <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="shrink-0 group-hover:animate-icon-rotate">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#00994a]/10 border border-[#00994a]/20 flex items-center justify-center group-hover:bg-[#00994a]/20 transition-colors">
                        {(() => {
                          const DocsIcon = docsCallout.icon;
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
                        {docsCallout.title}
                      </h3>
                      <p className="text-2xl text-gray-600 leading-relaxed">
                        {docsCallout.description}
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
          )}
        </div>
      )}
    </div>
  );
}
