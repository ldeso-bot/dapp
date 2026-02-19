import { isNullish } from 'remeda';
import { parseUnits } from 'viem';
import { MILLISECONDS_PER_DAY } from '../constants/protocol.constants';

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

export const formatUTCTime = (date: Date = new Date()) => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} UTC`;
};

export const formatTimestamp = (
  timestamp?: number | null,
  month?: 'long' | 'short'
): string => {
  if (!timestamp) return '';

  return new Date(Number(timestamp)).toLocaleDateString('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: month ?? 'long',
  });
};

export const daysUntil = (timestamp: number): number => {
  return Math.ceil((timestamp - new Date().getTime()) / MILLISECONDS_PER_DAY);
};

export const formatCurrentTime = (): string =>
  new Date().toLocaleTimeString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export const formatAmountWithCommas = (
  value?: number,
  digits?: number | 'auto'
): string => {
  if (isNullish(value)) return '0';

  const absValue = Math.abs(value);

  // Default: 2 digits
  if (isNullish(digits)) {
    digits = 2;
  }

  // Auto detect number of digits to show (3 non zero values)
  if (digits === 'auto') {
    if (absValue === 0) {
      // No digits for zero values
      digits = 0;
    } else {
      const log = Math.log10(absValue);
      digits = Math.max(0, Math.ceil(-log) + 2);
    }
  }

  const fixedValue = value.toFixed(digits);
  const splitValue = fixedValue.split('.');
  let integerPart = splitValue[0];
  let decimalPart = splitValue[1];

  if (isNullish(integerPart)) return (0).toFixed(digits);

  // Add commas to the integer part if value is greater than 1 to make it pretty
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (isNullish(decimalPart)) {
    return integerPart;
  }

  decimalPart = decimalPart.replace(/0+$/, '').padEnd(digits, '0');

  if (decimalPart.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalPart}`;
};

export const formatAmountWithUnits = (value: number): string => {
  return nFormatter(value, 0);
};

export const formatTonnesWithSuffix = (totalTonnes: number) => {
  const formatted = formatAmountWithUnits(totalTonnes);
  return totalTonnes >= 1_000_000 ? `${formatted}+` : formatted;
};

export const formatPriceUSDWithCommas = (
  value: number,
  digits?: number | 'auto'
): string => {
  return `$${formatAmountWithCommas(value, digits)}`;
};

/** A wrapper around parseUnits to handle null values and return a bigint */
export const parseAmount = (value?: number, decimals?: number): bigint => {
  if (!decimals || !value) {
    return 0n;
  }
  return parseUnits(String(value), decimals);
};

/**
 * Converts a date string (YYYY-MM-DD) to a Unix timestamp in seconds
 */
export const dateStringToTimestamp = (dateString?: string): number => {
  if (!dateString) {
    return 0;
  }
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
};
