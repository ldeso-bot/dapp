'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../Icon/Icon';
import Tag from '../Tag/Tag';
import { NavItem } from './navbar.utils';

type NavBarItemProps = NavItem;

export default function NavBarItem({
  icon,
  label,
  href,
  isAdvanced,
}: NavBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center justify-between gap-2 py-2 px-1',
        isActive && 'font-bold bg-void-10 rounded-xl',
        !isActive && 'hover:opacity-80'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon icon={icon} alt={label} size={20} />
        <div>{label}</div>
      </div>
      {isAdvanced && <Tag>Advanced</Tag>}
    </Link>
  );
}
