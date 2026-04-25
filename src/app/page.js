// This file is the route handler for "/".
// In Next.js App Router, every page.js inside the app/ folder defines a URL route.
// This one maps the root URL "/" to the HomeView component.
import HomeView from '@/views/HomeView';

// metadata here overrides the layout defaults for this specific page.
// og:type "website" is correct for a homepage (use "article" for blog posts).
export const metadata = {
  title: 'SWAP Podcast',
  description:
    'Podcast en español sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes ambiciosos de Argentina y LATAM.',
  openGraph: {
    title: 'SWAP Podcast — Para jóvenes que están construyendo algo',
    description:
      'Podcast en español sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes ambiciosos de Argentina y LATAM.',
    url: '/',
    type: 'website',
  },
  twitter: {
    title: 'SWAP Podcast — Para jóvenes que están construyendo algo',
    description:
      'Podcast en español sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes ambiciosos de Argentina y LATAM.',
  },
};

// podcastSchema: JSON-LD structured data tells Google this is a podcast.
// Google can show rich results (episode list, "listen on Spotify" links) in search.
// dangerouslySetInnerHTML is the correct React way to embed raw HTML — here it's
// safe because we wrote the content ourselves (no user input involved).
const podcastSchema = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'SWAP Podcast',
  description:
    'Conversaciones reales sobre salud, productividad, emprendimiento, IA y mindset. Para jóvenes que están construyendo algo.',
  url: 'https://pw-e-commerce.vercel.app',
  inLanguage: 'es',
  author: {
    '@type': 'Person',
    name: 'Segundo Campos',
  },
  publisher: {
    '@type': 'Organization',
    name: 'SWAP Podcast',
    url: 'https://pw-e-commerce.vercel.app',
  },
  sameAs: [
    'https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY',
    'https://www.instagram.com/swapodcast/',
    'https://www.tiktok.com/@swappodcast',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />
      <HomeView />
    </>
  );
}
