import { ROUTES } from '@/shared/constants/route.constants';

export default function FooterLinks() {
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-7 text-size-14">
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
          <a
            href={ROUTES.TERMS}
            target="_blank"
            rel="noopener noreferrer"
            className="!flex-none"
          >
            Legal &amp; Risk Disclosure
          </a>

          <a href={ROUTES.CONTACT_US} target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
