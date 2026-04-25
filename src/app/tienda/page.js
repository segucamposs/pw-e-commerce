// /tienda — Server Component (no 'use client' needed here).
// Server Components can export metadata and fetch data on the server.
// This page simply renders the TiendaView Client Component.
// Separation: route file = thin server wrapper; view file = all client logic.

import TiendaView from '@/views/TiendaView';

export const metadata = {
  title: 'SWAP Merch',
  description:
    'Merch oficial de SWAP Podcast. Remeras, buzos, accesorios y productos digitales para los que están construyendo algo.',
  openGraph: {
    title: 'SWAP Merch — Merch Oficial del Podcast',
    description:
      'Remeras, buzos, accesorios y productos digitales de SWAP Podcast.',
    url: '/tienda',
    type: 'website',
  },
  twitter: {
    title: 'SWAP Merch — Merch Oficial del Podcast',
    description:
      'Remeras, buzos, accesorios y productos digitales de SWAP Podcast.',
  },
};

// CollectionPage schema: tells Google this is a product listing page.
// ItemList enumerates the items so Google can show them in search results.
// We hardcode the store URL — in E5, this could be generated from Supabase data.
const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SWAP Merch',
  description: 'Merch oficial de SWAP Podcast.',
  url: 'https://pw-e-commerce.vercel.app/tienda',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://pw-e-commerce.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Merch', item: 'https://pw-e-commerce.vercel.app/tienda' },
    ],
  },
};

export default function TiendaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <TiendaView />
    </>
  );
}
