import { isNullish } from 'remeda';

export function formatAddress(
  address: string | undefined,
  options: { startLength?: number; endLength?: number } = {}
): string {
  if (!address) return '';

  const { startLength = 3, endLength = 3 } = options;

  return `${address.slice(0, startLength + 2)}...${address.slice(-endLength)}`;
}

export function formatPercentage(
  value: number | undefined,
  options: { decimals?: number } = {}
): string {
  const { decimals = 2 } = options;

  if (isNullish(value) || isNaN(value)) value = 0;

  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatUSD(value: number): string {
  if (isNaN(value)) return '0$';
  const size = Math.floor(value).toString().length;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: true,
    minimumSignificantDigits: 3,
    maximumFractionDigits: size > 3 ? 0 : 2,
  }).format(Number(value));
}

export function formatTimestamp(timestamp?: number | null): string {
  if (!timestamp) return '';

  return new Date(Number(timestamp)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const formatDuration = (days: number) => {
  if (days >= 365) {
    return `${days / 365}y`;
  }
  return `${days}d`;
};

export const formatDurationLong = (days: number) => {
  const years = Math.floor(days / 365);
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  return `${days} day${days > 1 ? 's' : ''}`;
};
