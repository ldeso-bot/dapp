'use client';

import { type ReactNode } from 'react';

type Props = { children: ReactNode };

export const DocumentList = ({ children }: Props) => (
  <ul className="list-disc pl-6 mt-2 space-y-1 text-size-14 text-text-2">
    {children}
  </ul>
);
