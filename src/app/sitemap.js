// sitemap.js — Next.js generates /sitemap.xml from this file at build time.
// A sitemap tells Google every URL on the site, when it was last updated,
// how often it changes, and its relative importance (priority 0–1).
//
// In E5, product IDs come from Supabase instead of the local array.
// The function must be async because await is needed for the DB query.

import { supabase } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pw-e-commerce.vercel.app';

export default async function sitemap() {
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

  // Fetch only the id column — we don't need the full product row here.
  const { data } = await supabase.from('products').select('id');

  const productRoutes = (data ?? []).map((product) => ({
    url: `${BASE_URL}/tienda/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
