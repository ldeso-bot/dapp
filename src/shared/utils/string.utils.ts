import { isNullish } from 'remeda';

/*
  Formats a number to a string with a suffix.
  Example: 1200 -> 1.2k
*/
const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol)
    : '0';
};

export const formatAddress = (
  address: string | undefined,
  options: { startLength?: number; endLength?: number } = {}
): string => {
  if (!address) return '';

  const { startLength = 3, endLength = 3 } = options;

  return `${address.slice(0, startLength + 2)}...${address.slice(-endLength)}`;
};

export const formatPercentage = (
  value: number | undefined,
  options: { decimals?: number } = {}
): string => {
  const { decimals = 2 } = options;

  if (isNullish(value) || isNaN(value)) value = 0;

  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatPriceUSD = (value: number, digits: number = 2): string => {
  return `$${nFormatter(value, digits)}`;
};

export const formatTimestamp = (timestamp?: number | null): string => {
  if (!timestamp) return '';

  return new Date(Number(timestamp)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/** Format a timestamp (seconds)to a date string mm/dd/yyyy */
export const formatDate = (date: number): string => {
  const dateObj = new Date(date * 1000);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };

  return dateObj.toLocaleDateString('en-US', dateOptions);
};

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

export const formatAmountWithCommas = (
  value: number,
  digits: number = 2
): string => {
  return value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatAmountWithUnits = (value: number): string => {
  return nFormatter(value, 0);
};

export const formatPriceUSDWithCommas = (value: number): string => {
  return `$${formatAmountWithCommas(value, 2)}`;
};
