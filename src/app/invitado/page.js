// This file defines the "/invitado" route.
// The folder name "invitado" becomes the URL segment — no extra config needed.
import GuestView from '@/views/GuestView';

export const metadata = {
  title: 'Para invitados — SWAP Podcast',
};

export default function InvitadoPage() {
  return <GuestView />;
}
