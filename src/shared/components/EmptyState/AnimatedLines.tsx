'use client';

export const AnimatedLines = () => {
  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`empty-state-topo-edge-fade`}
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
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.8"
          />
          <path
            d="M-50,458 Q110,422 260,440 T510,405 T760,432 T1010,398 T1260,422 T1510,395 T1760,418 T1900,400"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.7"
          />
          <path
            d="M-50,436 Q120,402 270,420 T520,388 T770,415 T1020,382 T1270,405 T1520,378 T1770,400 T1900,385"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.6"
          />
          <path
            d="M-50,408 Q140,375 290,392 T540,360 T790,385 T1040,355 T1290,378 T1540,350 T1790,372 T1900,358"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.7"
          />
          <path
            d="M-50,385 Q150,355 300,370 T550,342 T800,365 T1050,338 T1300,358 T1550,332 T1800,352 T1900,340"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.6"
          />
          <path
            d="M-50,362 Q160,335 310,350 T560,322 T810,345 T1060,320 T1310,340 T1560,315 T1810,335 T1900,322"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.5"
          />
          <path
            d="M-50,335 Q180,310 330,322 T580,295 T830,318 T1080,292 T1330,315 T1580,288 T1830,310 T1900,298"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.6"
          />
          <path
            d="M-50,312 Q190,288 340,300 T590,275 T840,298 T1090,272 T1340,295 T1590,268 T1840,290 T1900,278"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.5"
          />
          <path
            d="M-50,290 Q200,268 350,280 T600,255 T850,278 T1100,252 T1350,275 T1600,248 T1850,270 T1900,258"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.5"
          />
          <path
            d="M-50,265 Q220,245 370,255 T620,232 T870,252 T1120,228 T1370,250 T1620,225 T1870,245 T1900,235"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.4"
          />
          <path
            d="M-50,242 Q230,225 380,235 T630,215 T880,232 T1130,210 T1380,230 T1630,205 T1880,225 T1900,215"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.4"
          />
          <path
            d="M-50,220 Q240,205 390,215 T640,195 T890,212 T1140,192 T1390,210 T1640,188 T1890,208 T1900,198"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.35"
          />
          <path
            d="M-50,198 Q260,182 410,192 T660,175 T910,190 T1160,172 T1410,188 T1660,168 T1910,185 T1900,175"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.35"
          />
          <path
            d="M-50,178 Q270,165 420,175 T670,158 T920,172 T1170,155 T1420,170 T1670,152 T1920,168 T1900,158"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.3"
          />
          <path
            d="M-50,158 Q280,148 430,155 T680,140 T930,152 T1180,138 T1430,150 T1680,135 T1930,148 T1900,138"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.3"
          />
          <path
            d="M-50,138 Q300,128 450,135 T700,120 T950,132 T1200,118 T1450,130 T1700,115 T1900,125"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.25"
          />
          <path
            d="M-50,120 Q310,112 460,118 T710,105 T960,115 T1210,102 T1460,112 T1710,98 T1900,108"
            stroke={`url(#empty-state-topo-edge-fade)`}
            strokeWidth="0.25"
          />
          <path
            d="M-50,102 Q320,95 470,100 T720,88 T970,98 T1220,85 T1470,95 T1720,82 T1900,92"
            stroke={`url(#empty-state-topo-edge-fade)`}
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
          stroke="#00994a"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          className="opacity-15"
        />
      </svg>
    </>
  );
};
