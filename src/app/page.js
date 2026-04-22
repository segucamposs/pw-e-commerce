// This file is the route handler for "/".
// In Next.js App Router, every page.js inside the app/ folder defines a URL route.
// This one maps the root URL "/" to the HomeView component.
import HomeView from '@/views/HomeView';

export const metadata = {
  title: 'SWAP Podcast',
};

export default function HomePage() {
  return <HomeView />;
}
