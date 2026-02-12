import {
  MILLISECONDS_PER_DAY,
  ONE_DAY,
} from '@/shared/constants/protocol.constants';

export const formatDurationFromTimestamp = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;

  if (diff <= 0) {
    return '0m';
  }

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
};

export const isMaturityWithinDays = (
  maturityDate: number | null | undefined,
  daysThreshold: number = 3
): boolean => {
  if (!maturityDate) return false;
  const now = Math.floor(Date.now() / 1000);
  const daysUntilMaturity = (maturityDate - now) / ONE_DAY;
  return daysUntilMaturity < daysThreshold && daysUntilMaturity > 0;
};

export const formatDateDDMMYYYY = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDaysFromTimestamp = (
  timestamp: number,
  allowNegative = false
): number => {
  const now = Math.floor(Date.now() / 1000);
  const days = Math.floor(timestamp / ONE_DAY) - Math.floor(now / ONE_DAY);
  return allowNegative ? days : Math.max(0, days);
};

/**
 * Calculates and formats approximate duration from a timestamp to months/years
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted string like "Duration 90 d" or "Duration ~3 mo" or "Duration ~1 yr 2 mo"
 */
export const calculateApproxDuration = (timestamp: number): string => {
  const now = new Date();
  const maturityDate = new Date(timestamp * 1000);
  let months = maturityDate.getMonth() - now.getMonth();
  let years = maturityDate.getFullYear() - now.getFullYear();

  const daysDiff = Math.floor(
    (maturityDate.getTime() - now.getTime()) / MILLISECONDS_PER_DAY
  );

  if (daysDiff < 30) {
    return `Duration ${daysDiff} d`;
  }
  if (maturityDate.getDate() < now.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return `Duration ~${months} mo`;
  }
  if (months === 0) {
    return `Duration ~${years} yr`;
  }
  return `Duration ~${years} yr ${months} mo`;
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
