import { AnchorHTMLAttributes } from 'react';
import { cn } from '../utils/component.utils';
import { OpenInNewIcon } from './Svg/OpenInNewIcon';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  withoutIcon?: boolean;
  className?: string;
};
const LinkOpenInNew = ({ withoutIcon, className, ...props }: Props) => {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 text-green-60 hover:underline text-nowrap',
        className
      )}
    >
      {props.children}
      {!withoutIcon && <OpenInNewIcon className="w-4 h-4" />}
    </a>
  );
};

export default LinkOpenInNew;
