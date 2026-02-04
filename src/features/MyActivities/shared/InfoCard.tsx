import Button from '@/shared/components/Button/Button';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { type FC } from 'react';
import { InfoCardTooltipKey, InfoCardTooltips } from './InfoCardTooltips';

type InfoCardProps = {
  title?: string;
  tooltipId?: InfoCardTooltipKey;
  description: string;
  buttonLabel?: React.ReactNode;
  onButtonClick?: () => void;
  content: React.ReactNode;
};

export const InfoCard: FC<InfoCardProps> = (props) => {
  const { title, tooltipId, onButtonClick, buttonLabel, description, content } =
    props;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="px-4 lg:px-6 pt-4 lg:pt-5">
          <div className="flex items-center justify-between mb-4">
            {title && (
              <div className="flex items-center gap-2">
                <h2 className="text-size-18 font-medium">{title}</h2>
                {tooltipId && (
                  <Tooltip
                    className="max-w-[30rem] text-size-12 p-3"
                    content={InfoCardTooltips[tooltipId]?.()}
                  />
                )}
              </div>
            )}
            {buttonLabel && (
              <Button
                colors="secondary"
                className="h-[3.2rem] px-3 !pl-2 py-2 flex items-center gap-1"
                onClick={onButtonClick ? onButtonClick : undefined}
              >
                {buttonLabel}
              </Button>
            )}
          </div>
          {description && (
            <p className="text-size-14 text-gray-600 mb-4">{description}</p>
          )}
          {content && content}
        </div>
      </div>
    </div>
  );
};
