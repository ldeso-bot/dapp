'use client';

import { KycIntroAcknowledgment } from '@/features/Kyc/components/KycIntroAcknowledgment';
import { KycIntroErrorBanner } from '@/features/Kyc/components/KycIntroErrorBanner';
import { KycIntroExpandable } from '@/features/Kyc/components/KycIntroExpandable';
import { KycIntroFooter } from '@/features/Kyc/components/KycIntroFooter';
import { KycIntroHeader } from '@/features/Kyc/components/KycIntroHeader';
import { KycIntroSection } from '@/features/Kyc/components/KycIntroSection';
import { useState } from 'react';
import { KycPath } from '../kyc.utils';

type Props = {
  mode: KycPath;
  onModeChange: (mode: KycPath) => void;
  onContinue: () => void;
  onClose: () => void;
  widgetError?: string | null;
  onDismissError?: () => void;
};

export const KycIntroStep = ({
  onContinue,
  onClose,
  widgetError,
  onDismissError,
}: Props) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [onChainExpanded, setOnChainExpanded] = useState(false);
  const [privacyExpanded, setPrivacyExpanded] = useState(false);

  return (
    <div
      className="w-[92%] max-w-[600px] bg-white rounded-lg border border-gray-200 max-h-[80vh] overflow-y-auto"
      aria-labelledby="kyc-title"
      aria-describedby="kyc-subhead"
    >
      <KycIntroHeader onClose={onClose} />
      <div className="px-6 py-5 pb-3 space-y-5">
        {widgetError && (
          <KycIntroErrorBanner
            message={widgetError}
            onDismiss={onDismissError}
          />
        )}
        <KycIntroSection title="Why">
          <ul className="list-disc pl-3.5 space-y-1.5 text-size-14 text-gray-700">
            <li>Meet AML/abuse-prevention requirements.</li>
            <li>
              Align with carbon market integrity standards and counterparty
              requirements.
            </li>
            <li>
              Legal bases: legal obligation (where applicable) + legitimate
              interests.
            </li>
          </ul>
        </KycIntroSection>
        <KycIntroSection title="How it works">
          <p className="text-size-14 text-gray-700">
            zkMe checks liveness, sanctions/PEP, and validates your document. We
            receive a verification result (pass/flag), as well as your email
            address and citizenship status. We do not have access to your
            personal documents or biometrics. We do not store any of this
            information in our own systems; it stays in the zkMe platform.
          </p>
        </KycIntroSection>
        <KycIntroSection title="Eligibility parameters">
          <ul className="list-disc pl-3.5 space-y-1.5 text-size-14 text-gray-700">
            <li>
              <strong>Age:</strong> 18+ required.
            </li>
            <li>
              <strong>Citizenship/Residence:</strong> allow/deny list applies.
            </li>
          </ul>
        </KycIntroSection>
        <KycIntroSection title="On-chain">
          <ul className="list-disc pl-3.5 space-y-1.5 text-size-14 text-gray-700">
            <li>
              A <strong>non-identifying</strong> proof will be minted; on-chain
              data is public.
            </li>
            <li>
              Use a wallet you&apos;re comfortable associating with this proof.
            </li>
          </ul>
          <KycIntroExpandable
            label="What goes on-chain?"
            expanded={onChainExpanded}
            onToggle={() => setOnChainExpanded((v) => !v)}
          >
            A boolean proof (e.g., &quot;KYC passed&quot;, optional &quot;age
            ≥18&quot;). <strong>No personal data.</strong> Public and hard to
            delete.
          </KycIntroExpandable>
        </KycIntroSection>
        <KycIntroSection title="Privacy & contact">
          <p className="text-size-14 text-gray-700">
            Controller: Klima Fintech Ltd. •{' '}
            <strong>privacy@klimaprotocol.com</strong>
          </p>
          <KycIntroExpandable
            label="Read full privacy notice"
            expanded={privacyExpanded}
            onToggle={() => setPrivacyExpanded((v) => !v)}
          >
            zkMe verifies liveness, sanctions/PEP, and document validity. We
            receive only a pass/flag result (and on-chain proof).
          </KycIntroExpandable>
        </KycIntroSection>
        <KycIntroAcknowledgment
          checked={acknowledged}
          onChange={setAcknowledged}
        />
        <KycIntroFooter onContinue={onContinue} acknowledged={acknowledged} />
      </div>
    </div>
  );
};
