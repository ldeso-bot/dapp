import { PageTitle } from '@/shared/components/PageTitle/PageTitle';

const classes = {
  sectionTitle: 'text-size-18 font-semibold text-gray-800 mt-4 first:mt-0',
  body: 'text-size-14 text-gray-700 mt-2',
  list: 'list-disc pl-6 mt-2 space-y-1 text-size-14 text-gray-700',
};

export const TermsPage = () => (
  <div className="flex flex-col gap-2 overflow-y-auto">
    <PageTitle>Legal &amp; Risk Disclosure</PageTitle>
    <h2 className={classes.sectionTitle}>Nature of the Protocol</h2>
    <p className={classes.body}>
      Klima Protocol is an open-source, autonomous software system designed to
      support coordination and execution in carbon markets.
    </p>
    <p className={classes.body}>
      The protocol operates through publicly deployed smart contracts. Once
      deployed, its behaviour is governed by deterministic rules and participant
      interactions. No individual, foundation, committee, or organisation
      exercises discretionary control over protocol behaviour, pricing, or
      outcomes.
    </p>
    <p className={classes.body}>
      Users interact directly with decentralised software, not with an asset
      manager, broker, custodian, or investment service provider.
    </p>
    <h2 className={classes.sectionTitle}>
      No Investment Products or Asset Management
    </h2>
    <p className={classes.body}>
      The Klima Protocol does not offer investment products, profit-sharing
      arrangements, or ownership interests in assets held by the system.
    </p>
    <p className={classes.body}>
      Protocol-native tokens are functional coordination inputs. They are used
      to:
    </p>
    <ul className={classes.list}>
      <li>access carbon retirement functionality,</li>
      <li>signal preferences within predefined protocol rules, and</li>
      <li>enable participation in protocol-defined coordination mechanisms.</li>
    </ul>
    <p className={classes.body}>Tokens do not represent:</p>
    <ul className={classes.list}>
      <li>equity or ownership in the protocol or its assets,</li>
      <li>claims on protocol-held carbon,</li>
      <li>entitlement to surplus, revenue, or profits, or</li>
      <li>any form of managed investment interest.</li>
    </ul>
    <p className={classes.body}>
      The protocol does not manage assets on behalf of users, provide portfolio
      management services, or act in a fiduciary capacity.
    </p>
    <h2 className={classes.sectionTitle}>Carbon Credits and Retirement</h2>
    <p className={classes.body}>
      Carbon credits handled by the protocol are accessed exclusively for the
      purpose of retirement.
    </p>
    <p className={classes.body}>
      Credits supplied to the protocol are not made available for resale,
      secondary trading, or speculative use. Once accessed through the protocol,
      carbon credits may only be retired in accordance with protocol-defined
      processes.
    </p>
    <p className={classes.body}>
      The protocol does not provide custody, brokerage, advisory, or
      market-making services for carbon credits.
    </p>
    <h2 className={classes.sectionTitle}>Incentives and Protocol Issuance</h2>
    <p className={classes.body}>
      Certain protocol activities may be eligible for protocol-defined
      incentives. Any such incentives:
    </p>
    <ul className={classes.list}>
      <li>
        are governed by transparent, deterministic rules encoded in smart
        contracts,
      </li>
      <li>may change over time according to protocol conditions, and</li>
      <li>do not constitute interest, yield, or guaranteed returns.</li>
    </ul>
    <p className={classes.body}>
      Participation in coordination mechanisms does not create an expectation of
      profit. Outcomes depend on protocol rules, participant behaviour, and
      external market conditions.
    </p>
    <h2 className={classes.sectionTitle}>Risks and Limitations</h2>
    <p className={classes.body}>
      Interaction with decentralised software involves risk.
    </p>
    <p className={classes.body}>
      These risks may include, but are not limited to:
    </p>
    <ul className={classes.list}>
      <li>smart contract vulnerabilities or failures,</li>
      <li>changes in protocol parameters over time,</li>
      <li>fluctuations in token market conditions,</li>
      <li>incomplete, delayed, or inaccurate data inputs,</li>
      <li>
        regulatory or policy changes affecting carbon markets or blockchain
        systems.
      </li>
    </ul>
    <p className={classes.body}>
      The protocol is experimental. Outcomes are not guaranteed.
    </p>
    <p className={classes.body}>
      Users should only interact with the protocol if they understand these
      risks and are prepared to bear them independently.
    </p>
    <h2 className={classes.sectionTitle}>No Advice or Reliance</h2>
    <p className={classes.body}>
      Information made available through the protocol, its interfaces, or
      associated documentation is provided for general informational purposes
      only.
    </p>
    <p className={classes.body}>
      Nothing provided by the protocol constitutes financial, legal, tax,
      environmental, or investment advice. Users should seek independent
      professional advice where appropriate.
    </p>
    <p className={classes.body}>
      Users are solely responsible for their decisions and actions.
    </p>
    <h2 className={classes.sectionTitle}>Jurisdiction and Compliance</h2>
    <p className={classes.body}>
      Users are responsible for determining whether interaction with the
      protocol is permitted under applicable laws and regulations in their
      jurisdiction.
    </p>
    <p className={classes.body}>
      The protocol may not be suitable or accessible in all jurisdictions.
      Certain interfaces or features may be restricted based on jurisdictional
      requirements.
    </p>
    <p className={classes.body}>
      Access to the protocol is restricted in certain jurisdictions;
      jurisdictional eligibility is enforced through our compliance provider
      zkMe at the point of access, in accordance with applicable sanctions, AML,
      and platform policies.
    </p>

    <h2 className={classes.sectionTitle}>Acceptance of Terms</h2>
    <p className={classes.body}>
      By interacting with the Klima Protocol, you acknowledge that you are
      interacting with decentralised software governed by autonomous rules, and
      that no entity is providing you with managed services, guarantees, or
      assurances.
    </p>
    <h2 className={classes.sectionTitle}>Open-Source Transparency</h2>
    <p className={classes.body}>
      The protocol is open-source. All core logic is publicly accessible and
      auditable. Users are encouraged to review the relevant smart contracts and
      documentation prior to interaction.
    </p>
  </div>
);
