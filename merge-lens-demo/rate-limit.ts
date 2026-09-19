/** Per-key sliding-window rate limiter. */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const seen = hits.get(key) ?? [];
  const recent = seen.filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length <= max;
}

export function resetAll(): void {
  hits.clear();
}
