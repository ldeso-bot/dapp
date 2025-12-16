import { MenuBookIcon } from '@/shared/components/Svg/MenuBookIcon';
import { ReactNode } from 'react';

type FlowItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
  bgColor?: string;
  glowColor?: string;
};

type CtaConfig = {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  description?: string | ReactNode;
};

export type BenefitCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type DocsCallout = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type EmptyStateProps = {
  title: string | ReactNode;
  description: string;
  flowItems: FlowItem[];
  cta: CtaConfig;
  stats?: StatItem[];
  benefitSection?: {
    title: string;
    description: string;
    cards: BenefitCard[];
  };
  docsCallout?: DocsCallout;
  topographicBackgroundId?: string;
  primaryColor?: string;
  showParticle?: boolean;
};

export type WalletState = 'disconnected' | 'connected-no-locks' | 'has-locks';

const KLIMA_DOCS_URL = 'https://docs.klimaprotocol.com/';
export const DEFAULT_DOCS_CALLOUT: Omit<DocsCallout, 'title' | 'description'> =
  {
    href: KLIMA_DOCS_URL,
    icon: MenuBookIcon,
  };

const FLOW_ITEM_STYLES = [
  {
    bgColor: 'bg-secondary/20',
    glowColor: 'hsl(0 0% 98.5% / 0.18)',
  },
  {
    bgColor: 'bg-secondary/40',
    glowColor: 'hsl(0 0% 98.5% / 0.28)',
  },
  {
    bgColor: 'bg-secondary/60',
    glowColor: 'hsl(0 0% 98.5% / 0.38)',
  },
] as const;

export const createFlowItem = (
  icon: React.ComponentType<{ className?: string }>,
  label: string,
  sublabel: string,
  index: number
): FlowItem => {
  const style = FLOW_ITEM_STYLES[index % FLOW_ITEM_STYLES.length];
  return {
    icon,
    label,
    sublabel,
    bgColor: style.bgColor,
    glowColor: style.glowColor,
  };
};
