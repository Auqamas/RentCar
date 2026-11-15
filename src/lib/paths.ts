/** Public site URL used in sitemap / WhatsApp copy. */
export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.GITHUB_PAGES === "true"
      ? "https://auqamas.github.io/RentCar"
      : "http://localhost:3000")
  );
}
