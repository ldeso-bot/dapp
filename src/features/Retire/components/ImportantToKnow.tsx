'use client';

import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { HandIcon } from '@/shared/components/Svg/HandIcon';

export const ImportantToKnow = () => (
  <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-24">
    <div className="rounded-2xl text-card-foreground shadow-lg hover:shadow-xl border border-gray-100 backdrop-blur-sm">
      <div className="p-8 md:p-10 pb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="group-hover:animate-icon-rotate">
            <div className="w-12 h-12 rounded-2xl bg-[#00994a]/10 border border-gray-100/20 flex items-center justify-center">
              <HandIcon className="w-6 h-6 fill-[#00994a]" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2 group-hover:text-[#00994a] transition-colors">
              Important to know
            </h3>
            <p className="text-2xl text-gray-600 leading-relaxed">
              Before you retire, hereʼs what to expect.
            </p>
          </div>
        </div>
        <ul className="space-y-4 !list-disc mx-4">
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-gray-600">
              <strong className="text-2xl text-gray-800">Certificate:</strong>{' '}
              The certificate provides a blockchain transaction hash proof that
              the credit was permanently consumed and can never be transferred
              or resold.
            </span>
          </li>
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-gray-600">
              <strong className="text-2xl text-gray-800">Registry:</strong> For
              some credit types (e.g. EcoRegistry & Puro.Earth), you receive a
              certificate from the originating registry in addition to
              Carbonmark. This is possible due to strong interoperability
              frameworks in place at these registry providers.
            </span>
          </li>
          <li className="text-[#00994a] pl-2">
            <span className="text-2xl text-gray-600">
              <strong className="text-2xl text-gray-800">Permanent:</strong>{' '}
              Retirements are permanent and irreversible once successful—refunds
              are not possible.
            </span>
          </li>
        </ul>
        <div className="mt-8 pt-6 border-t border-[#f0f0f0]/60">
          <LinkOpenInNew href="https://carbonmark.com">
            Learn more about Carbonmark
          </LinkOpenInNew>
        </div>
      </div>
    </div>
  </div>
);
