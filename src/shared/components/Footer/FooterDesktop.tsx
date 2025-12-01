import FooterCopyright from './FooterCopyright';
import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';

export default function FooterDesktop() {
  return (
    <div className="hidden lg:flex flex-row bg-void-80 text-white p-10 justify-between gap-10">
      <div className="flex gap-10 items-center">
        <FooterLinks />
      </div>
      <div className="flex gap-10 items-center">
        <FooterCopyright />
        <FooterSocials />
      </div>
    </div>
  );
}
