import { localExtStorage } from "@webext-core/storage";
import { Mutex } from "async-mutex";

interface CachedValue<TValue> {
  value: TValue;
  expiresAt: number;
}

type Cache<TValue> = Record<string, CachedValue<TValue> | undefined>;

interface KeyValueCache<TValue> {
  /**
   * Get a value from the cache. Returns undefined if missing or expired.
   */
  get(key: string): Promise<TValue | undefined>;
  /**
   * Set a value in cache that exires after a certain amount of time.
   */
  set(key: string, value: TValue, expiresInMs: number): Promise<void>;
}

/**
 * Create a cache that stores a set of key-value pairs in extension storage.
 */
export function createKeyValueCache<TValue>(
  name: string
): KeyValueCache<TValue> {
  const storageKey = `@cache/${name}`;

  const mutex = new Mutex();

  const getCache = (): Promise<Cache<TValue>> =>
    localExtStorage.getItem(storageKey).then((res) => res ?? {});
  const setCache = (cache: Cache<any>): Promise<void> =>
    localExtStorage.setItem(storageKey, cache);

  const isValid = (
    cachedValue: CachedValue<any> | undefined,
    now: number
  ): cachedValue is CachedValue<any> =>
    !!cachedValue && cachedValue.expiresAt > now;

  /**
   * When creating the cache, delete any expired entries so it doesn't grow unchecked.
   *
   * The cache is short lived in general (service worker only lives for 30 seconds), so this happens
   * often.
   */
  const cleanup = () =>
    mutex.runExclusive(async () => {
      const now = Date.now();
      const cache = await getCache();
      Object.entries(cache).forEach(([key, cachedValue]) => {
        if (!isValid(cachedValue, now)) delete cache[key];
      });
      await setCache(cache);
    });
  cleanup();

  return {
    get(key) {
      return mutex.runExclusive(async () => {
        const now = Date.now();
        const cache = await getCache();
        const cachedValue = cache[key];
        return isValid(cachedValue, now) ? cachedValue.value : undefined;
      });
    },
    set(key, value, expiresInMs) {
      return mutex.runExclusive(async () => {
        const now = Date.now();
        const cache = await getCache();
        cache[key] = { value, expiresAt: now + expiresInMs };
        await setCache(cache);
      });
    },
  };
}
