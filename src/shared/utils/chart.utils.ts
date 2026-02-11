/**
 * Utility functions for chart domain and tick calculations
 */

/**
 * Calculates domain for log scale charts with automatic padding
 * @param data - Array of data objects
 * @param dataKey - Key to extract numeric values from data objects
 * @returns [min, max] domain array
 */
function calculateLogDomain<T>(data: T[], dataKey: keyof T): [number, number] {
  if (!data || data.length === 0) {
    return [0.1, 10]; // fallback values
  }

  const values = data
    .map((item) => {
      const value = item[dataKey];
      return typeof value === 'number' ? value : parseFloat(String(value));
    })
    .filter((val) => !isNaN(val) && val > 0);

  if (values.length === 0) {
    return [0.1, 10]; // fallback values
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  // Add padding: reduce min by 20%, increase max by 20%
  const paddedMin = min * 0.8;
  const paddedMax = max * 1.2;

  return [paddedMin, paddedMax];
}

/**
 * Calculates nice ticks for log scale charts
 * @param domain - [min, max] domain
 * @returns Array of tick values
 */
function calculateLogTicks(domain: [number, number]): number[] {
  const [min, max] = domain;

  if (min <= 0 || max <= 0) {
    return [0.1, 1, 10]; // fallback ticks
  }

  const logMax = Math.ceil(Math.log10(max));

  const ticks: number[] = [];
  // Generate ticks at powers of 10
  for (let i = logMax - 4; i <= logMax; i++) {
    const tickValue = Math.pow(10, i);
    ticks.push(tickValue);
  }

  return ticks;
}

/**
 * Calculates domain and ticks for log scale charts automatically
 * @param data - Array of data objects
 * @param dataKey - Key to extract numeric values from data objects
 * @returns Object with domain and ticks
 */
export function calculateLogScaleConfig<T>(data: T[], dataKey: keyof T) {
  const domain = calculateLogDomain(data, dataKey);
  const ticks = calculateLogTicks(domain);

  return { domain, ticks };
}
