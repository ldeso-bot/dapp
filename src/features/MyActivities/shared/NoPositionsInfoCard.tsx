'use client';

import Card from '@/shared/components/Card/Card';

type Props = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export const NoPositionsInfoCard = (props: Props) => {
  const { title, icon, description } = props;
  return (
    <Card className="bg-[#00994a]/10 rounded-lg border-none !shadow-none p-4 pt-2">
      <div className="flex flex-col gap-0.5">
        {icon}
        <div className="text-size-14 font-medium font-gray-900 mt-1">
          {title}
        </div>
        <div className="text-size-12 text-text-2">{description}</div>
      </div>
    </Card>
  );
};
