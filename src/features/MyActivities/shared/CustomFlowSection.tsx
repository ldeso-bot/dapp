'use client';

import { CheckCircleIcon } from '@/shared/components/Svg/CheckCircleIcon';
import { DashboardIcon } from '@/shared/components/Svg/DashboardIcon';
import { LayersIcon } from '@/shared/components/Svg/LayersIcon';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';

const FEATURE_CARDS = [
  {
    icon: DashboardIcon,
    title: 'Portfolio Snapshot [t325]',
    description:
      'See your estimated value, net deployed, and position status at a glance. [t326]',
  },
  {
    icon: LayersIcon,
    title: 'Positions [t327]',
    description:
      'Track kVCM locks, K2 position, and liquidity with action chips for claims and unlocks. [t328]',
  },
  {
    icon: WalletIcon,
    title: 'Balances [t329]',
    description:
      'Monitor wallet and deployed balances for kVCM, K2, USDC, and liquidity tokens. [t330]',
  },
] as const;

const PILL_ITEMS = [
  'Estimated value with accrued incentives [t331]',
  'Position cards with action chips [t332]',
  'Position distribution [t333]',
  'Token balances: wallet vs. deployed [t334]',
  'One-click actions [t335]',
] as const;

export const CustomFlowSection = () => (
  <div className="max-w-[102.4rem] mx-auto px-4 py-16 md:py-20">
    <div className="text-center mb-12">
      <h2 className="text-6xl font-bold mb-4">What you&apos;ll see [t336]</h2>
      <p className="text-size-18 text-text-2 mx-auto leading-tight">
        Your personal dashboard for tracking positions and incentives. [t337]
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {FEATURE_CARDS.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="relative p-6 rounded-xl bg-surface-1/50 border border-border-subtle/30 backdrop-blur-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-[#00994a]/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 fill-[#00994a]" />
          </div>
          <h3 className="text-size-18 font-semibold mb-2">{title}</h3>
          <p className="text-size-14 text-text-3 leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap justify-center gap-4">
      {PILL_ITEMS.map((label) => (
        <div
          key={label}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1/50 border border-border-subtle/30"
        >
          <CheckCircleIcon className="w-5 h-5 fill-[#00994a]" />
          <span className="text-size-14 text-text-3">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
