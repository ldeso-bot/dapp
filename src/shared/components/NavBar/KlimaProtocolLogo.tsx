'use client';

import klimaProtocolDark from '@/shared/components/NavBar/images/klimaProtocol-dark.svg';
import klimaProtocolLight from '@/shared/components/NavBar/images/klimaProtocol-light.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function KlimaProtocolLogo() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDark ? klimaProtocolLight : klimaProtocolDark}
      alt="klimaProtocol Logo"
      height={36}
      priority
    />
  );
}
