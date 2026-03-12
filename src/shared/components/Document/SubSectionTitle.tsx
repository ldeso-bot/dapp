'use client';

import { type ReactNode } from 'react';

type Props = { children: ReactNode };

export const SubSectionTitle = ({ children }: Props) => (
  <h3 className="text-size-16 font-semibold text-text-1 mt-3">{children}</h3>
);
