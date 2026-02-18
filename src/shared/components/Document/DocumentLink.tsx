'use client';

import { type AnchorHTMLAttributes, type ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const DocumentLink = ({ href, children, ...rest }: Props) => (
  <a href={href} className="text-green-700 hover:underline" {...rest}>
    {children}
  </a>
);
