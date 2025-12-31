'use client';
import Icon from '@/shared/components/Icon/Icon';
import FailureIcon from '@/shared/images/failure.svg';
import SuccessIcon from '@/shared/images/success.svg';
import { cn } from '@/shared/utils/component.utils';
import { useAtom } from 'jotai';
import { alertAtom } from './alert.atom';

export default function Alert() {
  const [alert, setAlert] = useAtom(alertAtom);

  if (!alert) return null;

  const className = cn(
    'w-full max-w-full absolute top-0 left-0 right-0 p-5 z-50',
    {
      'bg-green-10': alert.type === 'success',
      'bg-red-10': alert.type === 'error',
    }
  );
  const textColor = alert.type === 'success' ? 'text-green-80' : 'text-red-60';

  const icon = alert.type === 'success' ? SuccessIcon : FailureIcon;

  return (
    <div className={className}>
      <div className="flex flex-row gap-2 max-w-full">
        <div className="flex-shrink-0">
          <Icon icon={icon} size={2} />
        </div>
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <div className={cn('text-size-16 font-bold', textColor)}>
            {alert.title}
          </div>
          <div className={cn('text-size-14 break-words')}>
            {alert.description}
          </div>
          <div className="flex flex-row gap-4 sm:gap-10 flex-wrap">
            {alert.links?.map((link, index) => (
              <a
                key={index}
                className={cn(
                  'text-size-14 font-bold cursor-pointer whitespace-nowrap',
                  textColor
                )}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <div
              className={cn(
                'text-size-14 font-bold cursor-pointer whitespace-nowrap',
                textColor
              )}
              onClick={() => setAlert(null)}
            >
              Dismiss
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
