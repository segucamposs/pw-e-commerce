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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@swappodcast',
    url: 'https://www.tiktok.com/@swappodcast',
    color: '#69C9D0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.77 0 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.27 8.27 0 004.83 1.54V6.78a4.85 4.85 0 01-1.07-.09z" />
      </svg>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    handle: 'SWAP Podcast',
    url: 'https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY',
    color: '#1DB954',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.248-.428.1-.859-.17-.949-.59-.1-.429.17-.859.6-.949 4.912-1.121 9.122-.63 12.512 1.44.36.241.48.721.24 1.106zm1.44-3.3c-.301.42-.841.6-1.262.3-3.361-2.062-8.491-2.662-12.472-1.452-.48.15-.99-.12-1.14-.6-.15-.48.12-.99.6-1.14 4.562-1.381 10.232-.701 14.093 1.651.42.301.6.841.3 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@SwapPodcast',
    url: 'https://www.youtube.com/@SwapPodcast',
    color: '#FF0000',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'apple',
    name: 'Apple Podcasts',
    handle: 'SWAP Podcast',
    url: 'https://podcasts.apple.com/ar/podcast/swap-podcast/id1830727081',
    color: '#B150E2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
        <path d="M19 10v1a7 7 0 01-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
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
        <p className="redes-subtitle">Para los que están construyendo su versión.</p>

        <ul className="redes-list" aria-label="Redes sociales de SWAP Podcast">
          {SOCIALS.map(({ id, name, handle, url, color, icon }) => (
            <li key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="redes-card"
                style={{ '--platform-color': color }}
                aria-label={`Seguir SWAP en ${name}`}
              >
                <span className="redes-card-icon">{icon}</span>
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
