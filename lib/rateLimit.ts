// src/lib/rate-limit.ts
import RateLimit from "next-rate-limit";

// create limiter function directly
export const limiter = RateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // max 500 unique IPs per interval
});
// src/lib/rate-limit.ts
const ipCounts = new Map<string, { count: number; last: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = ipCounts.get(ip) || { count: 0, last: now };

  if (now - entry.last > WINDOW_MS) {
    entry.count = 1;
    entry.last = now;
  } else {
    entry.count++;
  }

  ipCounts.set(ip, entry);

  return entry.count <= MAX_REQUESTS;
}
