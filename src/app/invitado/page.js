// This file defines the "/invitado" route.
// The folder name "invitado" becomes the URL segment — no extra config needed.
import GuestView from '@/views/GuestView';

export const metadata = {
  title: 'Sé invitado',
  description:
    'Compartí tu historia en SWAP Podcast. Completá el formulario y te contactamos para coordinar un episodio.',
  openGraph: {
    title: 'Sé invitado en SWAP Podcast',
    description:
      'Compartí tu historia en SWAP Podcast. Completá el formulario y te contactamos para coordinar un episodio.',
    url: '/invitado',
    type: 'website',
  },
  twitter: {
    title: 'Sé invitado en SWAP Podcast',
    description:
      'Compartí tu historia en SWAP Podcast. Completá el formulario y te contactamos para coordinar un episodio.',
  },
};

export default function InvitadoPage() {
  return <GuestView />;
}
