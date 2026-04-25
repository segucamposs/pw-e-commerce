// /checkout — static route.
// Thin Server Component wrapper — all logic lives in CheckoutView (Client Component).

import CheckoutView from '@/views/CheckoutView';

export const metadata = {
  title: 'Checkout — SWAP Podcast',
  description: 'Finalizá tu compra de merch oficial de SWAP.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
