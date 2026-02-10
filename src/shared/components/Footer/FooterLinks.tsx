import { ROUTES } from '@/shared/constants/route.constants';

export default function FooterLinks() {
  return (
    <>
      <div className="text-green-40 text-size-14">KlimaProtocol.com</div>
      <div className="flex flex-row gap-10 text-size-14">
        <div>Resources</div>
        <a href={ROUTES.TERMS}>Legal & Risk Disclosure</a>
        <div>Contact</div>
      </div>
    </>
  );
}
