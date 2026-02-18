'use client';

import { type ReactNode } from 'react';

type Props = { href: string; children: ReactNode };

export const DocumentLink = ({ href, children }: Props) => (
  <a href={href} className="text-green-700 hover:underline">
    {children}
  </a>
);
