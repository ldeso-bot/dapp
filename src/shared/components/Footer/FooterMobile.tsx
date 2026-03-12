import FooterCopyright from './FooterCopyright';
import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';

export default function FooterMobile() {
  return (
    <div className="lg:hidden flex flex-col lg:flex-row bg-surface-inverse text-text-footer p-10 justify-between gap-10 items-center">
      <div className="flex flex-col gap-10 items-center">
        <FooterLinks />
      </div>
      <FooterSocials />
      <FooterCopyright />
    </div>
  );
}
