// @ts-expect-error: ttl-cache does not have types
import Cache from 'ttl-cache';
import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '../constants/config.constants';

const globalCache = new Cache({
  max: 10000,
  ttl: PROTOCOL_DATA_CACHE_TIME_SECONDS,
});

/**
 * A drop-in replacement for Next.js `unstable_cache` using ttl-cache.
 * Helps to cache promises to avoid dog-piling and share data across requests.
 *
 * @param fetcher The async function to cache
 * @param keyParts Static parts of the cache key
 * @param options Cache options (revalidate in seconds)
 * @returns A cached version of the fetcher function
 */
export function cached<T, Args extends unknown[]>(
  fetcher: (...args: Args) => Promise<T>,
  keyParts: (string | number)[],
  options: { revalidate: number; tags?: string[] }
) {
  return async (...args: Args): Promise<T> => {
    // Generate a unique key based on keyParts
    const key = JSON.stringify(keyParts);

    const cachedPromise = globalCache.get(key) as Promise<T> | undefined;
    if (cachedPromise !== undefined) {
      return cachedPromise;
    }

    const promise = fetcher(...args);
    // ttl-cache expects TTL in seconds
    globalCache.set(key, promise, options.revalidate);

    // Ensure we don't cache rejected promises indefinitely
    promise.catch(() => {
      globalCache.del(key);
    });

    return promise;
  };
}
