'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface PopupProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Popup({
  trigger,
  title,
  children,
  className = '',
}: PopupProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content
          className={clsx(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 min-w-[300px]',
            className
          )}
        >
          <Dialog.Title className="text-lg font-bold mb-4 uppercase">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
