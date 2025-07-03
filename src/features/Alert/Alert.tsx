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

  const className = cn('w-full absolute p-5', {
    'bg-green-10': alert.type === 'success',
    'bg-red-10': alert.type === 'error',
  });
  const textColor = alert.type === 'success' ? 'text-green-80' : 'text-red-60';

  const icon = alert.type === 'success' ? SuccessIcon : FailureIcon;

  return (
    <div className={className}>
      <div className="flex flex-row gap-2">
        <div>
          <Icon icon={icon} size={2} />
        </div>
        <div className="flex flex-col gap-2">
          <div className={cn('text-size-16 font-bold', textColor)}>
            {alert.title}
          </div>
          <div className={cn('text-size-14')}>{alert.description}</div>
          <div className="flex flex-row gap-10">
            {alert.links.map((link, index) => (
              <a
                key={index}
                className={cn(
                  'text-size-14 font-bold cursor-pointer',
                  textColor
                )}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <div
              className={cn('text-size-14 font-bold cursor-pointer', textColor)}
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
