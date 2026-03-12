import { cn } from '@/shared/utils/component.utils';
import ConnectButton from './ConnectButton';
import KlimaProtocolLogo from './KlimaProtocolLogo';
import styles from './navbar.module.css';
import NavbarItems from './NavbarItems';
import WalletInfo from './WalletInfo';

export default function DesktopNavBar() {
  return (
    <div className="hidden lg:flex border-r-1 border-border-default bg-surface-1">
      <div
        className={cn(`relative flex-col h-screen px-3 py-6`, styles.wNavbar)}
      >
        <div className="flex flex-col gap-3 text-text-1">
          <KlimaProtocolLogo />
          <WalletInfo />
          <NavbarItems />
        </div>
      </div>
      <div
        className={cn(
          `fixed bottom-6 justify-center flex flex-col px-3`,
          styles.wNavbar
        )}
      >
        <ConnectButton className="h-[4rem]" />
      </div>
    </div>
  );
}
