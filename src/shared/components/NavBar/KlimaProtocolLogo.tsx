import Image from 'next/image';
import klimaProtocolIcon from './images/klimaProtocol.svg';

export default function KlimaProtocolLogo() {
  return (
    <Image
      src={klimaProtocolIcon}
      alt="klimaProtocol Logo"
      height={36}
      priority
    />
  );
}
