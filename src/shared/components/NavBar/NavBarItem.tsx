'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavBarItemProps = {
  icon: string;
  label: string;
  href: string;
};

export default function NavBarItem({ icon, label, href }: NavBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-2 py-2 px-1',
        isActive && 'font-bold bg-void-10 rounded-xl',
        !isActive && 'hover:opacity-80'
      )}
    >
      <Image src={icon} alt={label} width={20} height={20} />
      <div>{label}</div>
    </Link>
  );
}
