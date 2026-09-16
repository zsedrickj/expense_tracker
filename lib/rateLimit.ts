// src/lib/rate-limit.ts
import RateLimit from "next-rate-limit";

// create limiter function directly
export const limiter = RateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // max 500 unique IPs per interval
});
// src/lib/rate-limit.ts
const requestCounts = new Map<string, { count: number; last: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 10_000;

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of requestCounts) {
    if (now - entry.last > WINDOW_MS) requestCounts.delete(key);
  }
}

export function checkRateLimit(key: string, maxRequests = MAX_REQUESTS) {
  const now = Date.now();
  pruneExpiredEntries(now);

  if (!requestCounts.has(key) && requestCounts.size >= MAX_TRACKED_KEYS) {
    return false;
  }

  const entry = requestCounts.get(key) || { count: 0, last: now };

  if (now - entry.last > WINDOW_MS) {
    entry.count = 1;
    entry.last = now;
  } else {
    entry.count++;
  }

  requestCounts.set(key, entry);

  return entry.count <= maxRequests;
}
