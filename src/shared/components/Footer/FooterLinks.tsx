import { ROUTES } from '@/shared/constants/route.constants';

export default function FooterLinks() {
  return (
    <div>
      <div className="flex flex-col items-center gap-y-3 text-size-14 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-2">
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
