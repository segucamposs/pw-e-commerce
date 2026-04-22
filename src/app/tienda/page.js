// /tienda — Server Component (no 'use client' needed here).
// Server Components can export metadata and fetch data on the server.
// This page simply renders the TiendaView Client Component.
// Separation: route file = thin server wrapper; view file = all client logic.

import TiendaView from '@/views/TiendaView';

export const metadata = {
  title: 'Tienda — SWAP Podcast',
  description: 'Merch oficial de SWAP Podcast. Remeras, buzos, accesorios y productos digitales.',
};

export default function TiendaPage() {
  return <TiendaView />;
}
