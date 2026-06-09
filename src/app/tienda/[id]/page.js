// /tienda/[id] — dynamic route Server Component.
// The [id] folder name tells Next.js this segment is dynamic.
// params.id contains whatever value appears in the URL:
//   /tienda/swap-hoodie   → params.id = 'swap-hoodie'
//   /tienda/swap-gorra    → params.id = 'swap-gorra'

import ProductView from '@/views/ProductView';
import { products } from '@/data/products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pw-e-commerce.vercel.app';

// generateStaticParams: tells Next.js which [id] values exist at build time.
// Next.js pre-renders one HTML file per product — faster load and better SEO
// because Google gets a real HTML page instead of waiting for JavaScript.
// In E5, this function will call Supabase instead of reading the local array.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

// generateMetadata: replaces the static `export const metadata = {...}`.
// It receives the same params as the page, so each product gets its own
// unique title, description, and OG image in the <head>.
// Without this, every product page would show "Producto — SWAP Podcast"
// in the browser tab and when shared on WhatsApp/Twitter/etc.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/tienda/${product.id}`,
      type: 'website',
      images: [
        {
          url: `/assets/products/${product.id}.png`,
          alt: product.name,
        },
      ],
    },
    twitter: {
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  // Product schema: Google can show price, availability, and images directly
  // in search results ("rich results") when this structured data is present.
  // BreadcrumbList shows the page path (Inicio > Tienda > Product Name)
  // in the Google search snippet.
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `${BASE_URL}/assets/products/${product.id}.png`,
        sku: product.id,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'ARS',
          price: product.price,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          url: `${BASE_URL}/tienda/${product.id}`,
          seller: {
            '@type': 'Organization',
            name: 'SWAP Podcast',
          },
        },
      }
    : null;

  const breadcrumbSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${BASE_URL}/tienda` },
          { '@type': 'ListItem', position: 3, name: product.name, item: `${BASE_URL}/tienda/${product.id}` },
        ],
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProductView productId={id} />
    </>
  );
}
