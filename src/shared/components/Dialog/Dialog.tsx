import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui';
import * as React from 'react';

type Props = {
  open: boolean;
  children: React.ReactNode;
};
export default function Dialog({ open, children }: Props) {
  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay />
        <DialogPrimitive.Content className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-1000 bg-overlay">
          <DialogPrimitive.Title>
            <VisuallyHidden.Root>Dialog</VisuallyHidden.Root>
          </DialogPrimitive.Title>
          <div className="w-[38.2rem]">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
