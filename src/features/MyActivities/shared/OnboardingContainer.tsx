'use client';

import { AnimatedLines } from '@/shared/components/EmptyState/AnimatedLines';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const OnboardingContainer = (props: Props) => {
  const { title, description, children } = props;
  return (
    <div className="min-h-screen pt-12">
      <div className="relative">
        <AnimatedLines />
        <div className="relative pb-12 max-w-[90rem] mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-[4rem] text-text-1 font-bold leading-normal tracking-tight bg-clip-text text-[#2B2B2B]">
              {title}
            </h1>
          </div>
          <p className="text-[2rem] text-text-2 leading-normal">
            {description}
          </p>
        </div>
      </div>
      <div className="max-w-[90rem] -mt-2 mb-12 mx-auto flex flex-col gap-4 bg-surface-1 rounded-lg border border-border-subtle p-12 min-h-[50rem] z-100 relative">
        {children}
      </div>
    </div>
  );
};
