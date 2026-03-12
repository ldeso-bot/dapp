'use client';

type Props = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export const NoPositionsHeader = (props: Props) => {
  const { title, icon, description } = props;
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="w-20 h-20 rounded-full bg-[#00994a]/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h2 className="text-size-24 font-bold text-center text-text-1 leading-normal">
        {title}
      </h2>
      <p className="text-size-16 max-w-2xl text-center text-text-2 leading-normal">
        {description}
      </p>
    </div>
  );
};
