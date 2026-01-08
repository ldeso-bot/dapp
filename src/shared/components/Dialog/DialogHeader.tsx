'use client';

import type { FC } from 'react';
import { CloseIcon } from '../Svg/CloseIcon';

type Props = {
  title: string;
  onClose: () => void;
  showCloseButton: boolean;
};

export const DialogHeader: FC<Props> = (props) => {
  const { title, showCloseButton, onClose } = props;
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-size-20 font-semibold text-gray-900">{title}</h2>
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="cursor-pointer bg-transparent border-none p-0 m-0"
        >
          <CloseIcon className="text-gray-800 hover:text-gray-500 transition-colors w-5 h-5" />
        </button>
      )}
    </div>
  );
};
