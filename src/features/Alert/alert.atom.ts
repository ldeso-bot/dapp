import { atom } from 'jotai';

type Alert = {
  title: string;
  description: string;
  type: 'error' | 'success';
  links?: {
    label: string;
    href: string;
  }[];
};

export const alertAtom = atom<Alert | null>(null);
