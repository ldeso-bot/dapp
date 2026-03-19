'use client';

import { cn } from '@/shared/utils/component.utils';
import type { CtaConfig } from '@/shared/utils/emptyState.utils';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import Button from '../Button/Button';
import { ArrowForwardIcon } from '../Svg/ArrowForwardIcon';

export const EmptyStateButton = ({ cta }: { cta: CtaConfig }) => {
  const { icon: Icon, text, description, className, onClick, href } = cta;

  const buttonClassName = cn(
    'h-14 px-6 gap-3 hover:scale-105 transition-transform bg-foreground text-text-inverse',
    className
  );

  const buttonContent = (
    <>
      <Icon className="w-5 h-5" />
      <span className="text-size-16">{text}</span>
      <ArrowForwardIcon className="w-4 h-4" />
    </>
  );

  return (
    <>
      <div className="transition-all duration-200">
        {onClick ? (
          <RainbowConnectButton.Custom>
            {({ openConnectModal, mounted }) => {
              if (!mounted) return null;
              return (
                <Button
                  onClick={() => onClick(openConnectModal)}
                  className={buttonClassName}
                  href={href}
                  target={href ? '_blank' : undefined}
                >
                  {buttonContent}
                </Button>
              );
            }}
          </RainbowConnectButton.Custom>
        ) : (
          <Button className={buttonClassName} href={href}>
            {buttonContent}
          </Button>
        )}
      </div>
      {description && (
        <p className="text-size-14 text-text-2 text-center">{description}</p>
      )}
    </>
  );
};
