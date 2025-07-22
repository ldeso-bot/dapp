'use client';

import { cn } from '@/shared/utils/component.utils';
import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui';
import * as React from 'react';

type Props = {
  open: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function Dialog({ open, children, className }: Props) {
  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay />
        <DialogPrimitive.Content className={cn("fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-1000 bg-overlay", className)}>
          <DialogPrimitive.Title>
            <VisuallyHidden.Root>Dialog</VisuallyHidden.Root>
          </DialogPrimitive.Title>
          <div className={cn('w-[38.2rem]', className)}>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root >
  );
}
