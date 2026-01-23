'use client';

import { cn } from '@/shared/utils/component.utils';
import type { CtaConfig } from '@/shared/utils/emptyState.utils';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import Button from '../Button/Button';
import { ArrowForwardIcon } from '../Svg/ArrowForwardIcon';

export const EmptyStateButton = ({ cta }: { cta: CtaConfig }) => {
  const { icon: Icon, text, description, className, onClick, href } = cta;
  return (
    <>
      <div className="transition-all duration-200">
        <RainbowConnectButton.Custom>
          {({ openConnectModal, mounted }) => {
            if (!mounted) return null;
            return (
              <Button
                onClick={() => onClick?.(openConnectModal)}
                className={cn(
                  'h-14 px-6 gap-3 hover:scale-105 transition-transform bg-foreground text-white',
                  className
                )}
                href={href}
                target="_blank"
              >
                <Icon className="w-5 h-5" />
                <span className="text-size-16">{text}</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </Button>
            );
          }}
        </RainbowConnectButton.Custom>
      </div>
      {description && (
        <p className="text-size-14 text-gray-600 text-center">
          {description}
        </p>
      )}
    </>
  );
};
