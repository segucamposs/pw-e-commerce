// layout.js is the root layout — it wraps every page in the app.
// Next.js renders this once and keeps it mounted while navigating between pages.
// It replaces the old public/index.html (fonts, lang) and App.js (shell structure).

import { Space_Grotesk, Poppins } from 'next/font/google';
import './globals.css';
import WhatsAppFab from '@/components/WhatsAppFab';

// next/font downloads and self-hosts fonts at build time — no Google request at runtime.
// The `variable` option creates a CSS custom property so the rest of the CSS can use
// var(--font-display) and var(--font-body) exactly as before.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// metadata exported from layout.js sets the site-wide defaults.
// Individual page.js files can override any of these values — Next.js merges them.
//
// metadataBase: required so Next.js can build absolute URLs for og:image and twitter:image.
// Without it, relative image paths ("/assets/...") in OG tags would be invalid.
//
// title.template: when a page exports title: 'Tienda', the browser tab shows
// "Tienda | SWAP Podcast" automatically — no manual string concatenation needed.
// title.default is used when a page doesn't export a title at all.
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pw-e-commerce.vercel.app'
  ),
  title: {
    default: 'SWAP Podcast',
    template: '%s | SWAP Podcast',
  },
  description:
    'Conversaciones reales sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes que están construyendo algo.',
  openGraph: {
    siteName: 'SWAP Podcast',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/assets/swap-logo-transparent.png',
        width: 1200,
        height: 630,
        alt: 'SWAP Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swappodcast',
  },
  icons: {
    icon: '/assets/swap-icon.png',
    apple: '/assets/swap-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${poppins.variable}`}>
      <body>
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
