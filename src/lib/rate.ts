type Entry = { timestamps: number[] };

const store = new Map<string, Entry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((t: number) => now - t < 60_000);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}, 5 * 60_000);

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number
) => {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((t: number) => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    store.set(key, entry);

    const oldest = entry.timestamps[0] ?? now; // fallback kalau undefined
    const resetMs = windowMs - (now - oldest);

    return { allowed: false, remaining: 0, resetMs };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return {
    allowed: true,
    remaining: limit - entry.timestamps.length,
    resetMs: windowMs
  };
};
