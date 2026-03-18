import { base, baseSepolia } from 'viem/chains';
import { IS_DEVELOPMENT } from '../constants/config.constants';

export const isProduction =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

const isPreview = () =>
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

export const getDefaultChainId = () => {
  if (IS_DEVELOPMENT || isPreview()) {
    return baseSepolia.id;
  }
  return base.id;
};
