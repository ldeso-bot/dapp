import { ROUTES } from '@/shared/constants/route.constants';

export default function FooterLinks() {
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-2 text-size-14">
        <a
          href={ROUTES.KLIMAPROTOCOL}
          className="text-green-40"
          target="_blank"
          rel="noopener noreferrer"
        >
          klimaprotocol.com
        </a>

        <a href={ROUTES.RESOURCES} target="_blank" rel="noopener noreferrer">
          Documentation
        </a>

        <a href={ROUTES.AUDIT} target="_blank" rel="noopener noreferrer">
          Audit
        </a>

        <a href={ROUTES.TERMS}>Terms</a>

        <a href={ROUTES.PRIVACY_POLICY}>Privacy Policy</a>

        <a href={ROUTES.CONTACT_US} target="_blank" rel="noopener noreferrer">
          Contact
        </a>
      </div>
    </div>
  );
}
