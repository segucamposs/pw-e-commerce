'use client';

import Link from 'next/link';
import '../redes.css';

const SOCIALS = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@swapodcast',
    url: 'https://www.instagram.com/swapodcast/',
    color: '#E1306C',
    logo: '/assets/socials/instagram.png',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@swappodcast',
    url: 'https://www.tiktok.com/@swappodcast',
    color: '#69C9D0',
    logo: '/assets/socials/tiktok.png',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    handle: 'SWAP Podcast',
    url: 'https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY',
    color: '#1DB954',
    logo: '/assets/socials/spotify.png',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@SwapPodcast',
    url: 'https://www.youtube.com/@SwapPodcast',
    color: '#FF0000',
    logo: '/assets/socials/youtube.png',
  },
  {
    id: 'apple',
    name: 'Apple Podcasts',
    handle: 'SWAP Podcast',
    url: 'https://podcasts.apple.com/ar/podcast/swap-podcast/id1830727081',
    color: '#B150E2',
    logo: '/assets/socials/apple-podcasts.png',
  },
];

function RedesView() {
  return (
    <>
      <header className="redes-header">
        <Link href="/" aria-label="Volver al inicio">
          <img src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="redes-header-logo" />
        </Link>
      </header>
      <div className="redes-page">
      <main className="redes-container">
        <p className="redes-subtitle">No somos expertos, preguntamos como vos 🎙</p>
        <p className="redes-cohosts">Co-hosts — Segu Campos &amp; Fran Bottaro</p>

        <ul className="redes-list" aria-label="Redes sociales de SWAP Podcast">
          {SOCIALS.map(({ id, name, handle, url, color, logo }) => (
            <li key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="redes-card"
                style={{ '--platform-color': color }}
                aria-label={`Seguir SWAP en ${name}`}
              >
                <span className="redes-card-icon">
                  <img src={logo} alt="" className="redes-card-logo" aria-hidden="true" />
                </span>
                <span className="redes-card-body">
                  <span className="redes-card-name">{name}</span>
                  <span className="redes-card-handle">{handle}</span>
                </span>
                <svg
                  className="redes-card-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <footer className="redes-footer">
          <p>© 2026 SWAP Podcast · Argentina</p>
        </footer>
      </main>
    </div>
    </>
  );
}

export default RedesView;
