// Route Handler — GET /api/episodes
//
// Fetches the live episode count from the Apple Podcasts / iTunes Search API.
// The iTunes API is public and requires no authentication — it returns a JSON
// object where `resultCount` includes the show itself (index 0) plus all episodes.
//
// We subtract 1 to get only the episode count, then cache the response for
// 1 hour (revalidate: 3600) so we don't hit Apple's API on every page load.
//
// URL: /api/episodes → { count: 14 }

import { NextResponse } from 'next/server';

const APPLE_PODCAST_ID = '1830727081';
const ITUNES_URL = `https://itunes.apple.com/lookup?id=${APPLE_PODCAST_ID}&entity=podcastEpisode&limit=1000`;

export async function GET() {
  try {
    const res = await fetch(ITUNES_URL, {
      // next.revalidate tells Next.js to cache this fetch for 1 hour.
      // After 1 hour, the next request will re-fetch from Apple and update the cache.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`iTunes API returned ${res.status}`);
    }

    const data = await res.json();
    // resultCount includes the podcast show entry (index 0) plus all episodes.
    // Subtracting 1 gives us the episode count only.
    const count = Math.max(0, data.resultCount - 1);

    return NextResponse.json({ count });
  } catch {
    // If the external API fails, fall back to the last known count.
    return NextResponse.json({ count: 14 });
  }
}
