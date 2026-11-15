type Bucket = { count: number; resetAt: number };

const windows = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function prune(now: number) {
  if (windows.size < 500) return;
  for (const [key, bucket] of windows) {
    if (bucket.resetAt <= now) windows.delete(key);
  }
}

export function rateLimit(key: string, max = MAX_ATTEMPTS, windowMs = WINDOW_MS) {
  const now = Date.now();
  prune(now);
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  if (current.count >= max) {
    return { ok: false, remaining: 0, retryAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true, remaining: max - current.count };
}
