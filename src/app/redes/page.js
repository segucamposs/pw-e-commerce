import RedesView from '@/views/RedesView';

export const metadata = {
  title: { absolute: 'SWAP Podcast — Redes Sociales' },
  description:
    'Seguinos en todas las plataformas: Instagram, TikTok, Spotify, YouTube y Apple Podcasts.',
  openGraph: {
    title: 'SWAP Podcast — Redes Sociales',
    description: 'Seguinos en todas las plataformas.',
    url: '/redes',
    type: 'website',
  },
};

export default function RedesPage() {
  return <RedesView />;
}
