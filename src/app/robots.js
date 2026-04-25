// robots.js — Next.js generates /robots.txt from this file at build time.
// It tells search engine crawlers which pages to index and where the sitemap is.
// Returning an object is cleaner than a static robots.txt because Next.js
// automatically formats it correctly.

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pw-e-commerce.vercel.app'}/sitemap.xml`,
  };
}
