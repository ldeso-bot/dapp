import { DocumentBody } from '@/shared/components/Document/Body';
import { DocumentLink } from '@/shared/components/Document/DocumentLink';
import { DocumentList } from '@/shared/components/Document/List';
import { SectionTitle } from '@/shared/components/Document/SectionTitle';
import { SubSectionTitle } from '@/shared/components/Document/SubSectionTitle';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';

export const LegalPage = () => (
  <div className="flex flex-col gap-2 overflow-y-auto">
    <PageTitle>Privacy Notice – Identity Verification (KYC)</PageTitle>
    <p className="text-size-14 text-gray-600">Last updated: February 2026</p>

    <section className="mt-3">
      <SectionTitle>1) Who we are (Controller)</SectionTitle>
      <DocumentBody>Klima Fintech Ltd. (British Virgin Islands)</DocumentBody>
      <DocumentBody>[Entity address]</DocumentBody>
      <DocumentBody>
        Contact: <DocumentLink href="mailto:privacy@klimaprotocol.com">privacy@klimaprotocol.com</DocumentLink>
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>2) What this notice covers</SectionTitle>
      <DocumentBody>
        This notice explains how we use zkMe to verify individuals (KYC) for
        access to protocol features, and how a non-identifying on-chain proof is
        used for access gating.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>3) Roles &amp; vendors</SectionTitle>
      <DocumentBody>
        <strong>Controller:</strong> Klima Fintech Ltd.
      </DocumentBody>
      <DocumentBody>
        <strong>Processor:</strong> zkMe (verification and attestations). zkMe
        may use approved sub-processors; see their published list.
      </DocumentBody>
      <DocumentBody>We have commercial and processing terms in place with zkMe.</DocumentBody>
    </section>

    <section>
      <SectionTitle>4) What happens in the verification flows</SectionTitle>
      <div className="mt-3">
        <SubSectionTitle>A) Individual verification (KYC)</SubSectionTitle>
        <DocumentBody>
          <strong>zkMe performs:</strong>
        </DocumentBody>
        <DocumentList>
          <li>document validation</li>
          <li>liveness checks</li>
          <li>AML screening (sanctions/PEP)</li>
          <li>eligibility checks (e.g., age and country parameters)</li>
        </DocumentList>
        <DocumentBody>
          <strong>What we receive in our systems (v1):</strong>
        </DocumentBody>
        <DocumentList>
          <li>verification outcome (pass/flag)</li>
          <li>verification reference (verification ID and timestamp)</li>
          <li>wallet address used for gating (and proof status)</li>
        </DocumentList>
        <DocumentBody>
          <strong>What we do not receive or store in our systems (v1):</strong>
        </DocumentBody>
        <DocumentList>
          <li>document images</li>
          <li>raw biometric data</li>
          <li>full document numbers</li>
          <li>decrypted identity attributes (e.g., name, DOB, address)</li>
        </DocumentList>
        <DocumentBody>
          zkMe processes the underlying KYC inputs to perform verification.
        </DocumentBody>
      </div>
    </section>

    <section>
      <SectionTitle>5) Purposes &amp; legal bases</SectionTitle>
      <DocumentBody>We process verification results and related data to:</DocumentBody>
      <DocumentList>
        <li>
          <strong>Meet compliance obligations where applicable</strong> (e.g.,
          AML/KYC requirements): legal obligation
        </li>
        <li>
          <strong>Protect platform integrity and prevent abuse</strong>,
          including aligning with counterparty and market integrity
          expectations: legitimate interests
        </li>
        <li>
          <strong>Enable access gating</strong> for features that require
          verification: contractual necessity (where applicable)
        </li>
      </DocumentList>
    </section>

    <section>
      <SectionTitle>6) On-chain proof (access gating)</SectionTitle>
      <DocumentBody>
        After successful verification, a non-transferable on-chain proof will be
        minted to your wallet. The proof:
      </DocumentBody>
      <DocumentList>
        <li>
          contains no personal data (boolean flags only, e.g.,
          &quot;verification passed&quot; and optional age threshold)
        </li>
        <li>is public and may be difficult or impossible to erase</li>
        <li>is used to gate access to protocol features</li>
      </DocumentList>
      <DocumentBody>
        Choose a wallet you are comfortable associating with this proof.
      </DocumentBody>
      <DocumentBody>
        We may revoke the proof or require re-verification if risk changes
        (e.g., sanctions updates, suspected fraud, policy changes).
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>7) Sharing &amp; disclosures</SectionTitle>
      <DocumentBody>We share data only as follows:</DocumentBody>
      <DocumentList>
        <li>zkMe and its sub-processors for verification</li>
        <li>
          Authorities/regulators only when required by law or upon lawful
          request
        </li>
        <li>
          Service providers (security/audit) under contract and with safeguards
        </li>
      </DocumentList>
      <DocumentBody>We do not sell personal data.</DocumentBody>
    </section>

    <section>
      <SectionTitle>8) International transfers</SectionTitle>
      <DocumentBody>
        zkMe and/or sub-processors may process data in multiple jurisdictions.
        Where cross-border transfers occur, we rely on appropriate safeguards
        (e.g., SCCs/IDTA/adequacy decisions where applicable). Details available
        on request.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>9) Retention</SectionTitle>
      <DocumentBody>
        <strong>In our systems (v1):</strong>
      </DocumentBody>
      <DocumentList>
        <li>
          We retain the verification outcome (pass/flag) and verification
          reference (ID/timestamp) for audit, security, and abuse prevention.
        </li>
        <li>
          If a flow is subject to AML retention requirements, we retain required
          records for 10 years after the relationship/transaction ends.
        </li>
        <li>Otherwise, we retain for [X months/years] and then delete.</li>
        <li>Access/security logs are retained [12–24 months].</li>
      </DocumentList>
      <DocumentBody>
        <strong>On-chain:</strong>
      </DocumentBody>
      <DocumentBody>
        The proof record is public and persists according to the
        blockchain&apos;s characteristics.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>10) Your rights</SectionTitle>
      <DocumentBody>Subject to applicable law, you may request:</DocumentBody>
      <DocumentList>
        <li>access, rectification, portability</li>
        <li>where applicable, erasure or restriction</li>
      </DocumentList>
      <DocumentBody>
        <strong>Notes:</strong>
      </DocumentBody>
      <DocumentList>
        <li>AML retention rules may limit or delay erasure.</li>
        <li>
          Where we rely on legitimate interests, you may object and we will
          assess your request.
        </li>
      </DocumentList>
      <DocumentBody>
        Contact: <DocumentLink href="mailto:privacy@klimaprotocol.com">privacy@klimaprotocol.com</DocumentLink>
      </DocumentBody>
      <DocumentBody>
        You may complain to your local supervisory authority where applicable.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>11) Security</SectionTitle>
      <DocumentBody>
        We apply technical and organizational measures including encryption in
        transit/at rest, role-based access controls, SSO/2FA where supported,
        vendor-console access controls, logging/monitoring, periodic access
        reviews, and incident response procedures.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>12) Automated decision-making</SectionTitle>
      <DocumentBody>
        We do not make solely automated decisions with legal or similarly
        significant effects. Flagged cases may be reviewed.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>13) Children</SectionTitle>
      <DocumentBody>
        Our services are intended for individuals 18+. We do not knowingly
        verify minors.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>14) Updates</SectionTitle>
      <DocumentBody>
        We may update this notice. The &quot;last updated&quot; date will change
        and material changes will be signposted in-app.
      </DocumentBody>
    </section>
  </div>
);
