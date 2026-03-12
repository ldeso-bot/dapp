'use client';

import type { ReactNode } from 'react';

type HeaderProps = {
  title: ReactNode | string;
  description: string;
};

export const Header = (props: HeaderProps) => {
  const { title, description } = props;

  return (
    <div className="space-y-5 md:space-y-8">
      <h1
        className="
          mx-auto max-w-7xl
          text-[4rem] sm:text-[5rem] md:text-[5.5rem] lg:text-[7rem]
          font-bold leading-[1.05] tracking-tight
          text-[#2B2B2B]"
      >
        {title}
      </h1>
      <p
        className="
          text-[1.85rem] sm:text-[2.15rem] md:text-[2.4rem] lg:text-[2.2rem]
          text-text-2
          max-w-3xl md:max-w-4xl lg:max-w-5xl
          mx-auto
          leading-snug"
      >
        {description}
      </p>
    </div>
  );
};
