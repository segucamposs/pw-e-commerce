// /tienda/[id] — dynamic route Server Component.
// The [id] folder name tells Next.js this segment is dynamic.
// params.id contains whatever value appears in the URL:
//   /tienda/swap-hoodie   → params.id = 'swap-hoodie'
//   /tienda/swap-gorra    → params.id = 'swap-gorra'
//
// We pass productId as a prop to ProductView, which handles the data fetch.

import ProductView from '@/views/ProductView';

export const metadata = {
  title: 'Producto — SWAP Podcast',
};

export default function ProductPage({ params }) {
  return <ProductView productId={params.id} />;
}
