import { DocumentBody } from '@/shared/components/Document/Body';
import { DocumentList } from '@/shared/components/Document/List';
import { SectionTitle } from '@/shared/components/Document/SectionTitle';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';

export const TermsPage = () => (
  <div className="flex flex-col gap-2 overflow-y-auto">
    <PageTitle>Legal &amp; Risk Disclosure</PageTitle>
    <SectionTitle>Nature of the Protocol</SectionTitle>
    <DocumentBody>
      Klima Protocol is an open-source, autonomous software system designed to
      support coordination and execution in carbon markets.
    </DocumentBody>
    <DocumentBody>
      The protocol operates through publicly deployed smart contracts. Once
      deployed, its behaviour is governed by deterministic rules and participant
      interactions. No individual, foundation, committee, or organisation
      exercises discretionary control over protocol behaviour, pricing, or
      outcomes.
    </DocumentBody>
    <DocumentBody>
      Users interact directly with decentralised software, not with an asset
      manager, broker, custodian, or investment service provider.
    </DocumentBody>
    <SectionTitle>No Investment Products or Asset Management</SectionTitle>
    <DocumentBody>
      The Klima Protocol does not offer investment products, profit-sharing
      arrangements, or ownership interests in assets held by the system.
    </DocumentBody>
    <DocumentBody>
      Protocol-native tokens are functional coordination inputs. They are used
      to:
    </DocumentBody>
    <DocumentList>
      <li>access carbon retirement functionality,</li>
      <li>signal preferences within predefined protocol rules, and</li>
      <li>enable participation in protocol-defined coordination mechanisms.</li>
    </DocumentList>
    <DocumentBody>Tokens do not represent:</DocumentBody>
    <DocumentList>
      <li>equity or ownership in the protocol or its assets,</li>
      <li>claims on protocol-held carbon,</li>
      <li>entitlement to surplus, revenue, or profits, or</li>
      <li>any form of managed investment interest.</li>
    </DocumentList>
    <DocumentBody>
      The protocol does not manage assets on behalf of users, provide portfolio
      management services, or act in a fiduciary capacity.
    </DocumentBody>
    <SectionTitle>Carbon Credits and Retirement</SectionTitle>
    <DocumentBody>
      Carbon credits handled by the protocol are accessed exclusively for the
      purpose of retirement.
    </DocumentBody>
    <DocumentBody>
      Credits supplied to the protocol are not made available for resale,
      secondary trading, or speculative use. Once accessed through the protocol,
      carbon credits may only be retired in accordance with protocol-defined
      processes.
    </DocumentBody>
    <DocumentBody>
      The protocol does not provide custody, brokerage, advisory, or
      market-making services for carbon credits.
    </DocumentBody>
    <SectionTitle>Incentives and Protocol Issuance</SectionTitle>
    <DocumentBody>
      Certain protocol activities may be eligible for protocol-defined
      incentives. Any such incentives:
    </DocumentBody>
    <DocumentList>
      <li>
        are governed by transparent, deterministic rules encoded in smart
        contracts,
      </li>
      <li>may change over time according to protocol conditions, and</li>
      <li>do not constitute interest, yield, or guaranteed returns.</li>
    </DocumentList>
    <DocumentBody>
      Participation in coordination mechanisms does not create an expectation of
      profit. Outcomes depend on protocol rules, participant behaviour, and
      external market conditions.
    </DocumentBody>
    <SectionTitle>Risks and Limitations</SectionTitle>
    <DocumentBody>
      Interaction with decentralised software involves risk.
    </DocumentBody>
    <DocumentBody>
      These risks may include, but are not limited to:
    </DocumentBody>
    <DocumentList>
      <li>smart contract vulnerabilities or failures,</li>
      <li>changes in protocol parameters over time,</li>
      <li>fluctuations in token market conditions,</li>
      <li>incomplete, delayed, or inaccurate data inputs,</li>
      <li>
        regulatory or policy changes affecting carbon markets or blockchain
        systems.
      </li>
    </DocumentList>
    <DocumentBody>
      The protocol is experimental. Outcomes are not guaranteed.
    </DocumentBody>
    <DocumentBody>
      Users should only interact with the protocol if they understand these
      risks and are prepared to bear them independently.
    </DocumentBody>
    <SectionTitle>No Advice or Reliance</SectionTitle>
    <DocumentBody>
      Information made available through the protocol, its interfaces, or
      associated documentation is provided for general informational purposes
      only.
    </DocumentBody>
    <DocumentBody>
      Nothing provided by the protocol constitutes financial, legal, tax,
      environmental, or investment advice. Users should seek independent
      professional advice where appropriate.
    </DocumentBody>
    <DocumentBody>
      Users are solely responsible for their decisions and actions.
    </DocumentBody>
    <SectionTitle>Jurisdiction and Compliance</SectionTitle>
    <DocumentBody>
      Users are responsible for determining whether interaction with the
      protocol is permitted under applicable laws and regulations in their
      jurisdiction.
    </DocumentBody>
    <DocumentBody>
      The protocol may not be suitable or accessible in all jurisdictions.
      Certain interfaces or features may be restricted based on jurisdictional
      requirements.
    </DocumentBody>
    <DocumentBody>
      Access to the protocol is restricted in certain jurisdictions;
      jurisdictional eligibility is enforced through our compliance provider
      zkMe at the point of access, in accordance with applicable sanctions, AML,
      and platform policies.
    </DocumentBody>

    <SectionTitle>Acceptance of Terms</SectionTitle>
    <DocumentBody>
      By interacting with the Klima Protocol, you acknowledge that you are
      interacting with decentralised software governed by autonomous rules, and
      that no entity is providing you with managed services, guarantees, or
      assurances.
    </DocumentBody>
    <SectionTitle>Open-Source Transparency</SectionTitle>
    <DocumentBody>
      The protocol is open-source. All core logic is publicly accessible and
      auditable. Users are encouraged to review the relevant smart contracts and
      documentation prior to interaction.
    </DocumentBody>
  </div>
);
