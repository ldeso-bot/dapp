import cardStyles from '@/shared/css/card.module.css';
import Image from 'next/image';
import ConnectButton from './ConnectButton';
import klimaProtocolIcon from './images/klimaProtocol.svg';
import { navItems } from './navbar.utils';
import NavBarItem from './NavBarItem';

export default function NavBar() {
  return (
    <div className="relative flex flex-col h-screen border-r-1 border-void-20 px-3 py-6">
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
      <div className="fixed bottom-6 left-3 right-3 flex justify-center">
        <div className="w-4/5">
          <div className={cardStyles.separator} />
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
