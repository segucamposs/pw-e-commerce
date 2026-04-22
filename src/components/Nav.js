'use client';
// Nav uses useState, useEffect, and useRef — all browser-only APIs.
// 'use client' is required for any component that uses React hooks or event handlers.

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goToGuest = () => {
    closeMenu();
    // router.push() is Next.js's programmatic navigation — replaces the old navigate() prop.
    router.push('/invitado');
  };

  return (
    <header className="header" role="banner" ref={headerRef}>
      <nav className="nav container" aria-label="Navegación principal">
        {/* Link from next/link handles client-side navigation without a page reload. */}
        <Link href="/" className="nav-logo" aria-label="SWAP Podcast — Inicio">
          <img src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="nav-logo-img" />
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>

        <ul className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`} id="nav-menu">
          {/* Hash links use /#section so they work from any route, not just "/" */}
          <li><a href="/#que-es" className="nav-link" onClick={closeMenu}>Qué es SWAP</a></li>
          <li><a href="/#temas" className="nav-link" onClick={closeMenu}>Temas</a></li>
          <li><a href="/#proceso" className="nav-link" onClick={closeMenu}>El proceso</a></li>
          <li><Link href="/tienda" className="nav-link" onClick={closeMenu}>Tienda</Link></li>
          <li>
            <button className="nav-link nav-cta" onClick={goToGuest}>
              Quiero ser invitado
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
