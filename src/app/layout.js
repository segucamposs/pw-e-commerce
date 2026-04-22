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

// metadata is exported from any layout or page file.
// Next.js merges metadata from the layout with whatever the page exports.
export const metadata = {
  title: 'SWAP Podcast',
  description:
    'Conversaciones reales sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes que están construyendo algo.',
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
