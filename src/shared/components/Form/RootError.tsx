import { cn } from '@/shared/utils/component.utils';
import { FC } from 'react';
import { AlertIcon } from '../Svg/AlertIcon';

type Props = {
  errorMessage: string;
  sticky?: boolean;
  variant?: 'error' | 'warning';
};

export const RootError: FC<Props> = ({
  errorMessage,
  sticky = true,
  variant = 'error',
}) => {
  const isWarning = variant === 'warning';
  return (
    <div
      className={cn(
        'border rounded-lg p-3',
        sticky ? 'sticky bottom-0 z-10' : '',
        isWarning ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
      )}
    >
      <div className="flex items-start items-center gap-2">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertIcon
            size={15}
            className={cn(isWarning ? 'text-amber-600' : 'text-red-60')}
          />
        </div>
        <div
          className={cn(
            'text-size-14',
            isWarning ? 'text-amber-800' : 'text-red-60'
          )}
        >
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
