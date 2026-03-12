'use client';

import { type ReactNode } from 'react';

type Props = { title: string; children: ReactNode };

export const KycIntroSection = ({ title, children }: Props) => (
  <section>
    <h4 className="text-size-14 font-semibold mb-2 text-text-1">{title}</h4>
    {children}
  </section>
);
