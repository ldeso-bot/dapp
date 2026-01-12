'use client';

import { DOCS_URL } from '@/shared/constants/urls.constants';
import type { DisclaimerComponent } from '@rainbow-me/rainbowkit';

export const ConnectModalDisclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting, you agree to the{' '}
    <Link href={`${DOCS_URL}/terms`}>Terms</Link> and acknowledge the{' '}
    <Link href={`${DOCS_URL}/protocol`}>Protocol docs</Link>.
  </Text>
);
