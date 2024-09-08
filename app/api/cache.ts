export function createCacheHandler<T>(
  handler: () => Promise<T>,
  {
    key,
    kv,
    ttlSeconds,
  }: {
    key: string;
    kv: KVNamespace;
    ttlSeconds: number;
  },
) {
  return async () => {
    const cache = await kv.get<T>(key, "json");
    if (cache) {
      return cache;
    }

    const result = await handler();
    await kv.put(key, JSON.stringify(result), {
      expirationTtl: ttlSeconds,
    });

    return result;
  };
}
