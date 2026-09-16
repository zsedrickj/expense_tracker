const fallbackSiteUrl = "http://localhost:3000";

/** The public canonical origin, shared by metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_BASE_URL || fallbackSiteUrl,
    ).origin;
  } catch {
    return fallbackSiteUrl;
  }
}
