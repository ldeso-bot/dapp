'use client';

import Button from '@/shared/components/Button/Button';
import Dialog from '@/shared/components/Dialog/Dialog';
import { NOTICE_ACK_KEY } from '@/shared/constants/storage.constants';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { DialogHeader } from '../Dialog/DialogHeader';

export const DisclaimerModal = () => {
  const [noticeAck, setNoticeAck] = useLocalStorage(NOTICE_ACK_KEY, false);

  const handleAccept = () => setNoticeAck(true);

  if (noticeAck) {
    return null;
  }

  return (
    <Dialog
      open
      preventEscapeKeyDown
      closeOnOutsideClick={false}
      className="w-[92vw] max-w-[600px] p-6 max-h-[80vh] mx-auto flex flex-col bg-surface-1 rounded-lg overflow-hidden"
    >
      <DialogHeader
        onClose={() => {}}
        title="Notice to Users"
        showCloseButton={false}
      />
      <div className="py-6 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0">
        <p className="text-size-14 text-text-2">
          Klima Protocol is open-source, experimental software for coordinating
          on-chain carbon market activity.
        </p>
        <p className="text-size-14 text-text-2">
          It is not an investment product or asset-management service, and it
          does not offer profit-sharing or guaranteed outcomes. Tokens are used
          to participate in protocol coordination and carbon retirement within
          predefined rules.
        </p>
        <p className="text-size-14 text-text-2">
          Smart contracts may change or fail, and token availability/prices can
          fluctuate — you may lose funds. Use only if you understand these
          risks.
        </p>
        <p className="text-size-14 text-text-2">
          Nothing here is financial, investment, tax, or legal advice. By
          proceeding, you acknowledge you&apos;re interacting with decentralised
          software — not an intermediary.
        </p>
        <p className="text-size-14 text-text-2">
          To learn more, click on the Terms link in the footer.
        </p>
      </div>
      <div className="flex items-center justify-end sm:justify-between shrink-0">
        <Button
          autoFocus
          colors="secondary"
          onClick={handleAccept}
          className="w-full min-h-[4.2rem] py-2 px-6 text-text-static-light"
        >
          Acknowledge and Accept
        </Button>
      </div>
    </Dialog>
  );
};
