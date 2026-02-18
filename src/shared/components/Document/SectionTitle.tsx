'use client';

import { type ReactNode } from 'react';

type Props = { children: ReactNode };

export const SectionTitle = ({ children }: Props) => (
  <h2 className="text-size-18 font-semibold text-gray-800 mt-4 first:mt-0">
    {children}
  </h2>
);
