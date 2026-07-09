/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Brownie da Rô",
  description:
    "Brownies artesanais recheados e personalizados para festas e eventos no Rio de Janeiro. Sem corantes nem conservantes. Delivery e loja em Catumbi.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/assets/og/open-graph.jpg",
  twitterHandle: "@browniedaro",
  author: "Brownie da Rô",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#3d2417",
} as const;
