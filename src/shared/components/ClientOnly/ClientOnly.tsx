import dynamic from 'next/dynamic';
import { FunctionComponent, PropsWithChildren } from 'react';

// This component is used to ensure that certain components are only rendered on the client side.
// This is useful to prevent hydratation errors
const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) =>
  children;

export default dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false,
});
