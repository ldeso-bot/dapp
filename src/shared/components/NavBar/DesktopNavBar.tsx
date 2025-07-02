import { cn } from '@/shared/utils/component.utils';
import { Separator } from '../Separator/Separator';
import ConnectButton from './ConnectButton';
import KlimaProtocolLogo from './KlimaProtocolLogo';
import styles from './navbar.module.css';
import NavbarItems from './NavbarItems';
import WalletInfo from './WalletInfo';

export default function DesktopNavBar() {
  return (
    <div className="hidden lg:flex ">
      <div
        className={cn(
          `relative flex-col h-screen border-r-1 border-void-20 px-3 py-6`,
          styles.wNavbar
        )}
      >
        <div className="flex flex-col gap-3">
          <KlimaProtocolLogo />
          <Separator />
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
        <Separator />
        <ConnectButton />
      </div>
    </div>
  );
}
