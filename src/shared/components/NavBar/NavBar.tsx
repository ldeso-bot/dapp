import cardStyles from '@/shared/css/card.module.css';
import helpIcon from '@/shared/images/help_white.svg';
import clsx from 'clsx';
import Image from 'next/image';
import ConnectButton from './ConnectButton';
import klimaProtocolIcon from './images/klimaProtocol.svg';
import styles from './navbar.module.css';
import { navItems } from './navbar.utils';
import NavBarItem from './NavBarItem';
import WalletInfo from './WalletInfo';
export default function NavBar() {
  return (
    <>
      <div
        className={clsx(
          'flex flex-col h-screen border-r-1 border-void-20 px-3 py-6',
          styles.navbarWidth
        )}
      >
        <div className="flex flex-col gap-3">
          <Image
            src={klimaProtocolIcon}
            alt="klimaProtocol Logo"
            height={36}
            priority
          />
          <WalletInfo />
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
      {/* Navbar footer*/}
      <div
        className={clsx(
          'fixed bottom-0 flex flex-col px-3 py-6 gap-3',
          styles.navbarWidth
        )}
      >
        <button className="flex items-center gap-2 rounded-3xl bg-void-50 text-white cursor-pointer py-2 px-4">
          <Image src={helpIcon} alt={'Help'} width={16} height={16} />
          Show me around
        </button>
        <ConnectButton />
      </div>
    </>
  );
}
