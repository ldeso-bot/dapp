import { MenuBookIcon } from '@/shared/components/Svg/MenuBookIcon';
import { ReactNode } from 'react';

type CtaClickHandler = (openConnectModal: () => void) => void;
export type CtaConfig = {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: CtaClickHandler;
  description?: string | ReactNode;
  className?: string;
  href?: string;
} ;

export type FlowItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
  bgColor?: string;
  glowColor?: string;
};

type InfoCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta?: Pick<CtaConfig, 'text'> & { activeView: string };
};

export type StatItem = {
  value: string;
  label: string;
};

export type StatsCardsProps = {
  stats: StatItem[];
};

export type DocsCalloutProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type InfoCardsProps = {
  title: string;
  description: string;
  cards: InfoCard[];
  showSteps?: boolean;
};

export type EmptyStateProps = {
  title: string | ReactNode;
  description: string;
  flowItems: FlowItemProps[];
  cta: CtaConfig;
  stats?: StatItem[];
  infoCards?: InfoCardsProps;
  docsCallout?: DocsCalloutProps;
  topographicBackgroundId?: string;
  primaryColor?: string;
  customCalloutSection?: ReactNode;
};

export type WalletState = 'disconnected' | 'connected-no-locks' | 'has-locks';

const KLIMA_DOCS_URL = 'https://docs.klimaprotocol.com/';

export const DEFAULT_DOCS_CALLOUT: Omit<
  DocsCalloutProps,
  'title' | 'description'
> = {
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
): FlowItemProps => {
  const style = FLOW_ITEM_STYLES[index % FLOW_ITEM_STYLES.length];
  if (!style) {
    return {
      icon,
      label,
      sublabel,
      bgColor: 'bg-secondary/20',
      glowColor: 'hsl(0 0% 98.5% / 0.18)',
    };
  }
  return {
    icon,
    label,
    sublabel,
    bgColor: style.bgColor,
    glowColor: style.glowColor,
  };
};
