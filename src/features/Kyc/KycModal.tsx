'use client';

import '@zkmelabs/widget/dist/style.css';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getDefaultChainId } from '@/shared/utils/environment.utils';
import { useAccount, useWalletClient } from 'wagmi';
import { kycDialogAtom, kycRefetchAtom, KycPath } from './kyc.utils';
import { KycIntroStep } from './steps/KycIntroStep';

type Step = 'intro' | 'kyc';

export const KycModal = () => {
  const [dialog, setDialog] = useAtom(kycDialogAtom);
  const [step, setStep] = useState<Step>('intro');
  const [mode, setMode] = useState<KycPath>('kyc');
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const kycWidgetRef = useRef<unknown>(null);
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const refetchKycStatus = useAtomValue(kycRefetchAtom);

  const open = dialog.open;

  const onClose = useCallback(() => {
    setDialog({ open: false, source: null });
    setStep('intro');
    setMode('kyc');
    setWidgetError(null);
  }, [setDialog]);

  const launchKycWidget = useCallback(async (): Promise<boolean> => {
    setWidgetError(null);

    // Use wallet's current chain so delegate tx and wallet match (avoids ChainMismatchError).
    const chainId = chain?.id ?? getDefaultChainId();
    const chainIdHex = `0x${chainId.toString(16)}`;

    const widgetModule = await import('@zkmelabs/widget');
    const appId = process.env.NEXT_PUBLIC_ZKME_KYC_APP_ID ?? '';

    if (!appId) {
      setWidgetError(
        'Verification is temporarily unavailable. Please try again later.'
      );
      return false;
    }

    const { ZkMeWidget } = widgetModule;
    const provider = {
      getUserAccounts: async (): Promise<string[]> =>
        address ? [address] : [],
      getAccessToken: async (): Promise<string> => {
        const res = await fetch('/api/kyc/access-token', { method: 'POST' });
        const data = await res.json();
        if (!res.ok) {
          setWidgetError(data?.error ?? 'Failed to get KYC token');
          throw new Error(data?.error ?? 'Failed to get KYC token');
        }
        return data.accessToken;
      },
      delegateTransaction: async (
        tx: {
          from?: string;
          to?: string;
          data?: string;
          value?: bigint | string;
          gas?: bigint | string;
          gasLimit?: string;
        }
      ): Promise<string> => {
        if (!walletClient?.account) {
          setWidgetError('Wallet not connected');
          throw new Error('Wallet not connected');
        }
        const hash = await walletClient.sendTransaction({
          account: walletClient.account,
          to: tx.to ? (tx.to as `0x${string}`) : undefined,
          data: tx.data ? (tx.data as `0x${string}`) : undefined,
          value: tx.value !== undefined ? BigInt(tx.value) : undefined,
          gas: tx.gasLimit
            ? BigInt(tx.gasLimit)
            : tx.gas !== undefined
              ? BigInt(tx.gas)
              : undefined,
        });
        return hash;
      },
    };

    const widget = new ZkMeWidget(
      appId,
      'Klima Protocol',
      chainIdHex,
      provider,
      {
        programNo: process.env.NEXT_PUBLIC_ZKME_KYC_PROGRAM_NO ?? '',
        lv: 'zkKYC',
        theme: 'light',
        locale: 'en',
      }
    );

    widget.on(
      'kycFinished',
      (results: { isGrant: boolean; associatedAccount?: string }) => {
        if (
          results.isGrant &&
          (!results.associatedAccount ||
            (address &&
              results.associatedAccount === address.toLowerCase()))
        ) {
          refetchKycStatus?.();
          onClose();
        }
      }
    );
    widget.on('close', () => {});

    try {
      (kycWidgetRef as React.MutableRefObject<unknown>).current = widget;
      widget.launch();
      return true;
    } catch (err) {
      setWidgetError(
        err instanceof Error ? err.message : 'Failed to start KYC verification'
      );
      return false;
    }
  }, [address, chain?.id, onClose, refetchKycStatus, walletClient]);

  const handleContinue = useCallback(async () => {
    if (mode === 'kyc') {
      const ok = await launchKycWidget();
      if (ok) setStep('kyc');
    }
  }, [mode, launchKycWidget]);

  useEffect(() => {
    if (!open) return;
    setStep('intro');
    setMode('kyc');
    setWidgetError(null);
  }, [open]);

  useEffect(() => {
    return () => {
      const kyc = (
        kycWidgetRef as React.MutableRefObject<{ destroy?: () => void } | null>
      ).current;
      kyc?.destroy?.();
    };
  }, []);

  if (!open) return null;

  if (step === 'kyc') {
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="w-[42rem] mx-auto p-6 text-center text-gray-600">
          <p>
            If the zk.me KYC window did not open, ensure{' '}
            <code className="text-size-12 bg-gray-100 px-1 rounded">
              NEXT_PUBLIC_ZKME_KYC_APP_ID
            </code>{' '}
            is set and KYC token API is configured.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-size-14 underline text-gray-900 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <KycIntroStep
        mode={mode}
        onModeChange={setMode}
        onContinue={handleContinue}
        onClose={onClose}
        widgetError={widgetError}
        onDismissError={() => setWidgetError(null)}
      />
    </Dialog>
  );
};
