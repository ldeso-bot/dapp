'use client';

import { cn } from '@/shared/utils/component.utils';
import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui';
import * as React from 'react';

type Props = {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  preventEscapeKeyDown?: boolean;
};

export default function Dialog(props: Props) {
  const {
    open,
    children,
    className,
    onClose,
    closeOnOutsideClick = true,
    preventEscapeKeyDown = false,
  } = props;

  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-overlay z-50" />
        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-fit',
            className
          )}
          aria-describedby="Dialog"
          onEscapeKeyDown={() =>
            preventEscapeKeyDown ? undefined : onClose?.()
          }
          onInteractOutside={() => closeOnOutsideClick && onClose?.()}
        >
          <DialogPrimitive.Title>
            <VisuallyHidden.Root>Dialog</VisuallyHidden.Root>
          </DialogPrimitive.Title>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
