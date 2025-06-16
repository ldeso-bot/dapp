import cardStyles from '@/shared/css/card.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import ConnectButton from './ConnectButton';
import klimaProtocolIcon from './images/klimaProtocol.svg';
import styles from './navbar.module.css';
import { navItems } from './navbar.utils';
import NavBarItem from './NavBarItem';

export default function NavBar() {
  return (
    <>
      <div
        className={clsx(
          `relative flex flex-col h-screen border-r-1 border-void-20 px-3 py-6`,
          styles.wNavbar
        )}
      >
        <div className="flex flex-col gap-3">
          <Image
            src={klimaProtocolIcon}
            alt="klimaProtocol Logo"
            height={36}
            priority
          />
          <div className={cardStyles.separator} />
          <div>
            {navItems.map((item) => (
              <NavBarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          `fixed bottom-6 justify-center flex flex-col px-3`,
          styles.wNavbar
        )}
      >
        <div className={cardStyles.separator} />
        <ConnectButton />
      </div>
    </>
  );
}
