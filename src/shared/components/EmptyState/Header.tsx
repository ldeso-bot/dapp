'use client';

import type { ReactNode } from 'react';

type HeaderProps = {
  title: ReactNode | string;
  description: string;
};

export const Header = (props: HeaderProps) => {
  const { title, description } = props;
  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-[7rem] font-bold leading-[1] tracking-tight bg-clip-text text-[#2B2B2B]">
        {title}
      </h1>
      <p className="text-[2.2rem] text-gray-600 max-w-5xl mx-auto leading-tight">
        {description}
      </p>
    </div>
  );
};
