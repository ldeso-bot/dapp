'use client';

import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { HandIcon } from '@/shared/components/Svg/HandIcon';
import { CARBONMARK_URL } from '@/shared/constants/urls.constants';

export const ImportantToKnow = () => (
  <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-24">
    <div className="rounded-2xl text-text-1 bg-surface-1 shadow-lg hover:shadow-xl border border-border-subtle backdrop-blur-sm">
      <div className="p-8 md:p-10 pb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="group-hover:animate-icon-rotate">
            <div className="w-12 h-12 rounded-2xl bg-[#00994a]/10 border border-border-subtle/20 flex items-center justify-center">
              <HandIcon className="w-6 h-6 fill-[#00994a]" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2 group-hover:text-[#00994a] transition-colors">
              Important to know [t119]
            </h3>
            <p className="text-2xl text-text-2 leading-relaxed">
              Before you retire, hereʼs what to expect. [t120]
            </p>
          </div>
        </div>
        <ul className="space-y-4 !list-disc mx-4">
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-text-2">
              <strong className="text-2xl text-text-1">Certificate:</strong> The
              certificate provides a blockchain transaction hash proof that the
              credit was permanently consumed and can never be transferred or
              resold. [t121]
            </span>
          </li>
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-text-2">
              <strong className="text-2xl text-text-1">Registry:</strong> For
              some credit types (e.g. EcoRegistry & Puro.Earth), you receive a
              certificate from the originating registry in addition to
              Carbonmark. This is possible due to strong interoperability
              frameworks in place at these registry providers. [t122]
            </span>
          </li>
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-text-2">
              <strong className="text-2xl text-text-1">Permanent:</strong>{' '}
              Retirements are permanent and irreversible once successful—refunds
              are not possible. [t123]
            </span>
          </li>
        </ul>
        <div className="mt-8 pt-6 border-t border-[#f0f0f0]/60">
          <LinkOpenInNew href={CARBONMARK_URL}>
            Learn more about Carbonmark [t124]
          </LinkOpenInNew>
        </div>
      </div>
    </div>
  </div>
);
