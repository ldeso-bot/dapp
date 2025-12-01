/**
 * Converts a Unix timestamp to a duration string format (e.g., "90d", "89d 21h", "5h 30m", "45m")
 * @param timestamp - Unix timestamp in seconds (future date)
 * @returns Formatted duration string
 */
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
