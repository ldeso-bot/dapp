'use client';

import cardStyles from '@/shared/css/card.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import ConnectButton from './ConnectButton';
import hamburgerIcon from './images/hamburger.svg';
import KlimaProtocolLogo from './KlimaProtocolLogo';
import NavbarItems from './NavbarItems';
import WalletInfo from './WalletInfo';

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={clsx(
          `flex lg:hidden relative flex-col border-r-1 border-void-20 px-3 py-6`
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <KlimaProtocolLogo />
            <Image
              className="cursor-pointer"
              src={hamburgerIcon}
              alt="Menu button"
              height={36}
              priority
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className={clsx('flex flex-col gap-3', !open && 'hidden')}>
            <div className={cardStyles.separator} />
            <WalletInfo />
            <NavbarItems />
            <div className={cardStyles.separator} />
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  );
}
