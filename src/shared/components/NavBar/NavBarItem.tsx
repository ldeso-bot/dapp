'use client';

import { cn } from '@/shared/utils/component.utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../Icon/Icon';
import { NavItem } from './navbar.utils';

type NavBarItemProps = NavItem;

export default function NavBarItem({
  icon,
  label,
  href,
  isDisabled = false,
}: NavBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between gap-2 py-2 px-1',
        isActive && 'font-bold bg-void-10 rounded-xl',
        isDisabled &&
          'opacity-80 hover:opacity-80 cursor-not-allowed pointer-events-none font-normal',
        !isActive && 'hover:opacity-80'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon icon={icon} alt={label} size={2} />
        <div>{label}</div>
      </div>
    </Link>
  );
}
