// sitemap.js — Next.js generates /sitemap.xml from this file at build time.
// A sitemap tells Google every URL on the site, when it was last updated,
// how often it changes, and its relative importance (priority 0–1).
//
// We import the products array so every product page is automatically
// included without needing to maintain the sitemap by hand.

import { products } from '@/data/products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pw-e-commerce.vercel.app';

export default function sitemap() {
  // Static routes — pages that always exist.
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/invitado`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/redes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic routes — one entry per product.
  // When E5 replaces the mock array with Supabase, this map() stays the same
  // because the product shape doesn't change.
  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/tienda/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
