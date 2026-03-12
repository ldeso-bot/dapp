import { DocumentBody } from '@/shared/components/Document/Body';
import { DocumentLink } from '@/shared/components/Document/DocumentLink';
import { DocumentList } from '@/shared/components/Document/List';
import { SectionTitle } from '@/shared/components/Document/SectionTitle';
import { SubSectionTitle } from '@/shared/components/Document/SubSectionTitle';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';

export const PrivacyPolicyPage = () => (
  <div className="flex flex-col gap-2 overflow-y-auto text-text-1">
    <PageTitle>Privacy Policy</PageTitle>
    <p className="text-size-14 text-text-2">Last updated: March 2, 2026</p>
    <p className="text-text-2">
      This Privacy Policy explains how personal data may be processed when you
      use Klima Protocol websites and any related verification-gated features.
      Most Klima Protocol activity is on-chain and therefore public by design.
    </p>

    <section className="mt-3">
      <SectionTitle>1) Who we are</SectionTitle>
      <DocumentBody>Controller: Klima Fintech Ltd.</DocumentBody>
      <DocumentBody>
        Contact:{' '}
        <DocumentLink href="mailto:privacy@klimaprotocol.com">
          privacy@klimaprotocol.com
        </DocumentLink>
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>2) What this policy covers</SectionTitle>
      <DocumentBody>This policy covers:</DocumentBody>
      <DocumentList>
        <li>
          Website / off-chain interactions (e.g., pages you visit, forms you
          submit, support communications).
        </li>
        <li>
          On-chain activity (e.g., wallet addresses and transactions recorded on
          public blockchains).
        </li>
        <li>
          Identity verification (KYC), where used via zkMe, and the resulting
          verification outcome and gating status we maintain.
        </li>
      </DocumentList>
      <DocumentBody>
        This policy does not replace third-party policies for vendors you
        interact with directly (e.g., zkMe). Where relevant, we link to those
        resources.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>
        3) Key concept: on-chain data is public and persistent
      </SectionTitle>
      <DocumentBody>
        When you interact with Klima Protocol smart contracts, the blockchain
        will record information such as:
        <DocumentList>
          <li>Wallet address</li>
          <li>Transactions and interaction history</li>
          <li>Token balances (depending on chain mechanics)</li>
        </DocumentList>
      </DocumentBody>
      <DocumentBody>This information:</DocumentBody>
      <DocumentList>
        <li>Is publicly visible</li>
        <li>Is not controlled by Klima Fintech Ltd.</li>
      </DocumentList>
    </section>

    <section>
      <SectionTitle>4) Identity verification (KYC) via zkMe</SectionTitle>

      <div className="mt-3">
        <SubSectionTitle>4.1 When verification is used</SubSectionTitle>
        <DocumentBody>
          Some features may require verification to align with market integrity,
          counterparty requirements, or risk controls that the ecosystem chooses
          to apply (for example, to reduce fraud/abuse or meet expectations of
          certain carbon market participants).
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>4.2 Roles</SubSectionTitle>
        <DocumentBody>
          <strong>Klima Fintech Ltd.:</strong> controller for the limited
          verification result data we maintain (see below).
        </DocumentBody>
        <DocumentBody>
          <strong>zkMe:</strong> processes identity verification inputs
          (documents, liveness checks, screening) within their systems.
        </DocumentBody>
        <DocumentBody>
          Learn more:{' '}
          <DocumentLink href="https://docs.zk.me/hub/" target="_blank">
            zkMe documentation
          </DocumentLink>
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>
          4.3 What happens in verification flows
        </SubSectionTitle>
        <DocumentBody>
          zkMe may perform (depending on configuration):
        </DocumentBody>
        <DocumentList>
          <li>document validation</li>
          <li>liveness checks</li>
          <li>screening checks (e.g., sanctions/PEP)</li>
          <li>eligibility checks (e.g., age or country parameters)</li>
        </DocumentList>

        <DocumentBody>
          <strong>What we receive from zkMe:</strong>
        </DocumentBody>
        <DocumentList>
          <li>Verification outcome (e.g., pass / flag)</li>
          <li>Verification reference (e.g., verification ID and timestamp)</li>
          <li>Wallet address used for gating</li>
          <li>
            Proof / gating status (e.g., whether a proof/attestation is present
            and recognized)
          </li>
          <li>Email address</li>
          <li>Citizenship status</li>
        </DocumentList>
        <DocumentBody>
          We do not store any of this information in our own systems; it is held
          within the zkMe platform.
        </DocumentBody>

        <DocumentBody>
          <strong>What we do not have access to:</strong>
        </DocumentBody>
        <DocumentList>
          <li>Document images</li>
          <li>Raw biometric data</li>
          <li>Full document numbers</li>
        </DocumentList>
      </div>

      <div className="mt-3">
        <SubSectionTitle>
          4.4 Wallet address sharing clarification
        </SubSectionTitle>
        <DocumentBody>
          To enable verification-gated access and (where applicable)
          minting/association of a non-transferable proof, zkMe must be able to
          associate a verification result to a wallet address. Depending on
          implementation, this may occur because:
        </DocumentBody>
        <DocumentList>
          <li>you provide the wallet address during the zkMe flow, and/or</li>
          <li>
            we transmit the wallet address to zkMe for the purpose of completing
            verification association or proof minting.
          </li>
        </DocumentList>
        <DocumentBody>
          In all cases, the wallet address is the only identifier we expect to
          share for this purpose, and we do not send identity documents to zkMe.
        </DocumentBody>
      </div>
    </section>

    <section>
      <SectionTitle>5) Access gating proof (on-chain)</SectionTitle>
      <DocumentBody>
        After successful verification, a non-transferable on-chain
        proof/attestation may be minted or referenced for gating.
      </DocumentBody>
      <DocumentBody>This proof/attestation:</DocumentBody>
      <DocumentList>
        <li>
          is designed to contain no “raw” personal identity data (e.g., it may
          reflect boolean or threshold flags such as “passed verification” and
          optional eligibility thresholds)
        </li>
        <li>
          is public and may be difficult or impossible to erase due to
          blockchain properties
        </li>
        <li>is used to gate access to certain features</li>
      </DocumentList>
      <DocumentBody>
        Choose a wallet you are comfortable associating with this
        proof/attestation.
      </DocumentBody>
      <DocumentBody>
        We may revoke gating or require re-verification if risk changes (e.g.,
        policy updates, suspected fraud, sanctions list updates, or integrity
        concerns).
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>
        6) Website contact forms &amp; off-chain communications
      </SectionTitle>
      <DocumentBody>
        If you contact Klima Protocol via a website form:
      </DocumentBody>
      <DocumentList>
        <li>the form data is processed by Carbonmark DMCC</li>
        <li>
          Carbonmark acts as controller for that form submission data under its
          own policy
        </li>
        <li>
          Carbonmark’s privacy policy:{' '}
          <DocumentLink
            href="https://www.carbonmark.com/privacy-policy"
            target="_blank"
          >
            https://www.carbonmark.com/privacy-policy
          </DocumentLink>
        </li>
      </DocumentList>

      <DocumentBody>Typical form data may include:</DocumentBody>
      <DocumentList>
        <li>Name</li>
        <li>Email address</li>
        <li>Organization name</li>
        <li>Message content</li>
      </DocumentList>

      <DocumentBody>
        This data is used to respond to your enquiry and manage follow-up
        communications directly related to that enquiry. Where you opt in,
        contact details may be used to send updates; you can unsubscribe at any
        time.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>7) Cookies &amp; analytics</SectionTitle>
      <DocumentBody>The website may use:</DocumentBody>
      <DocumentList>
        <li>Essential cookies (site functionality)</li>
        <li>Analytics / session tools (e.g., Lucky Orange)</li>
        <li>Standard traffic analytics</li>
      </DocumentList>

      <DocumentBody>These tools may collect:</DocumentBody>
      <DocumentList>
        <li>IP address (or partial IP depending on configuration)</li>
        <li>Browser type / device info</li>
        <li>Pages visited</li>
        <li>Interaction data (e.g., clicks, scroll)</li>
      </DocumentList>

      <DocumentBody>We use analytics to:</DocumentBody>
      <DocumentList>
        <li>Improve usability and performance</li>
        <li>Understand general traffic patterns</li>
        <li>Protect the site from abuse and diagnose issues</li>
      </DocumentList>

      <DocumentBody>
        We do not use analytics for advertising profiling.
      </DocumentBody>

      <DocumentBody>
        Where required by law, we provide a cookie consent mechanism.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>
        8) Purposes and legal bases (GDPR/UK GDPR, where applicable)
      </SectionTitle>
      <DocumentBody>
        Where GDPR/UK GDPR applies, we process limited personal data for:
      </DocumentBody>
      <DocumentList>
        <li>
          <strong>Security and abuse prevention</strong> (e.g., protecting
          services, investigating suspicious activity)
          <br />
          Legal basis: legitimate interests
        </li>
        <li>
          <strong>Site analytics and product improvement</strong>
          <br />
          Legal basis: legitimate interests (and consent where required for
          cookies/trackers)
        </li>
        <li>
          <strong>Responding to enquiries</strong> (where you contact us)
          <br />
          Legal basis: legitimate interests (and/or steps requested by you prior
          to a potential relationship)
        </li>
        <li>
          <strong>Verification-gated access</strong> (where verification is
          used)
          <br />
          Legal basis: legitimate interests (protecting integrity, reducing
          abuse, aligning with counterparty expectations)
        </li>
      </DocumentList>
    </section>

    <section>
      <SectionTitle>9) Sharing and disclosures</SectionTitle>
      <DocumentBody>We do not sell personal data.</DocumentBody>

      <DocumentBody>We may share limited data as follows:</DocumentBody>

      <div className="mt-3">
        <SubSectionTitle>9.1 zkMe (verification vendor)</SubSectionTitle>
        <DocumentBody>
          zkMe processes identity verification inputs within zkMe systems. We
          receive and store only the limited outcomes/references described
          above. zkMe may use sub-processors; refer to zkMe’s published
          materials for details.
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>
          9.2 Service providers (security/audit)
        </SubSectionTitle>
        <DocumentBody>
          We may use service providers for security monitoring, auditing,
          incident response, or infrastructure. Where used, access is limited
          and subject to contractual and technical safeguards. Data involved is
          expected to be limited to items like wallet addresses, timestamps, and
          security logs.
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>9.3 Authorities / regulators</SubSectionTitle>
        <DocumentBody>
          Only where required by law or upon lawful request, we may disclose
          information we hold. In practice, this is expected to be limited to
          wallet addresses and gating/verification status metadata (not identity
          documents, which we do not hold).
        </DocumentBody>
      </div>
    </section>

    <section>
      <SectionTitle>10) Data retention</SectionTitle>

      <div className="mt-3">
        <SubSectionTitle>10.1 On-chain</SubSectionTitle>
        <DocumentBody>
          On-chain records are retained according to blockchain characteristics
          and are not controlled by us.
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>10.2 In our systems (off-chain)</SubSectionTitle>
        <DocumentBody>
          Verification data (including email address and citizenship status) is
          held within the zkMe platform and is not stored in Klima&apos;s own
          systems. Refer to zkMe&apos;s terms and policies for their retention
          practices.
        </DocumentBody>
        <DocumentBody>
          We may maintain a wallet-address-to-gating-status mapping for the
          purpose of operating verification-gated access controls, audit, and
          abuse prevention.
        </DocumentBody>
      </div>

      <div className="mt-3">
        <SubSectionTitle>10.3 zkMe retention</SubSectionTitle>
        <DocumentBody>
          zkMe’s retention and deletion practices are controlled by zkMe. Refer
          to zkMe’s terms/policies for how long they retain verification inputs
          and what deletion options exist.
        </DocumentBody>
      </div>
    </section>

    <section>
      <SectionTitle>11) Your rights</SectionTitle>
      <DocumentBody>Subject to applicable law, you may request:</DocumentBody>
      <DocumentList>
        <li>Access to personal data we hold about you</li>
        <li>Rectification (where applicable)</li>
        <li>Restriction or objection (where applicable)</li>
        <li>Portability (where applicable)</li>
        <li>Erasure (where legally possible)</li>
      </DocumentList>

      <DocumentBody>
        <strong>Notes (important limitations)</strong>
      </DocumentBody>
      <DocumentList>
        <li>On-chain data cannot be deleted or modified by us.</li>
        <li>
          zkMe’s retention rules may limit or delay erasure of data held by
          zkMe.
        </li>
        <li>
          Where we rely on legitimate interests, you may object, and we will
          assess your request.
        </li>
        <li>
          If you request erasure of the data we maintain for gating, the
          practical effect is that we can remove your wallet address and
          associated pass/flag status from our allowlist / gating records. If
          removed, that wallet will not be able to access verification-gated
          features unless it completes verification again through zkMe.
        </li>
        <li>
          Refer to zkMe’s terms of use and privacy materials for their retention
          and erasure terms.
        </li>
      </DocumentList>

      <DocumentBody>
        To exercise rights:{' '}
        <DocumentLink href="mailto:privacy@klimaprotocol.com">
          privacy@klimaprotocol.com
        </DocumentLink>{' '}
        and include the wallet address(es) relevant to your request.
      </DocumentBody>

      <DocumentBody>
        You may also have the right to complain to your local supervisory
        authority where applicable.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>12) International transfers</SectionTitle>
      <DocumentBody>
        Blockchain infrastructure is global by design.
      </DocumentBody>
      <DocumentBody>
        For off-chain processing, vendors (including zkMe) and infrastructure
        providers may process data in multiple jurisdictions. Where required,
        appropriate safeguards are used (e.g., SCCs/IDTA/adequacy decisions).
        You can request more detail via{' '}
        <DocumentLink href="mailto:privacy@klimaprotocol.com">
          privacy@klimaprotocol.com
        </DocumentLink>
        .
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>13) Security</SectionTitle>
      <DocumentBody>
        We apply reasonable technical and organizational measures appropriate to
        the limited off-chain data we process. Measures may include controls
        such as encryption in transit, access controls, logging/monitoring, and
        vendor management. Blockchain security is governed by the underlying
        networks and your wallet provider.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>14) Children</SectionTitle>
      <DocumentBody>
        Klima Protocol services described here are intended for individuals 18+.
        We do not knowingly verify minors.
      </DocumentBody>
    </section>

    <section>
      <SectionTitle>15) Changes to this policy</SectionTitle>
      <DocumentBody>
        We may update this policy from time to time. The “Last updated” date
        will change, and material updates will be posted on this page.
      </DocumentBody>
    </section>
  </div>
);
