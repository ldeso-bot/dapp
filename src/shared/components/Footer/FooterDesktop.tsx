import FooterCopyright from './FooterCopyright';
import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';

export default function FooterDesktop() {
  return (
    <div className="hidden lg:flex flex-row bg-surface-inverse p-10 justify-between gap-10">
      <div className="flex gap-10 items-center">
        <FooterLinks />
      </div>
      <div className="flex gap-10 items-center text-text-static-light">
        <FooterCopyright />
        <FooterSocials />
      </div>
    </div>
  );
}
