'use client';

import { type ReactNode } from 'react';

type Props = { children: ReactNode };

export const DocumentBody = ({ children }: Props) => (
  <p className="text-size-14 text-gray-700 mt-2">{children}</p>
);
