import { useState, useEffect, useRef } from 'react';

// Nav manages two pieces of state:
//   menuOpen — whether the mobile hamburger menu is visible
//   scrolled  — handled via a ref + DOM class (not state, to avoid re-renders)
function Nav({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null); // direct reference to the <header> DOM node

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Add "scrolled" class to header when the user scrolls past 50px.
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

  const goToGuest = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('guest');
  };

  return (
    <header className="header" role="banner" ref={headerRef}>
      <nav className="nav container" aria-label="Navegación principal">
        <a
          href="/"
          className="nav-logo"
          aria-label="SWAP Podcast — Inicio"
          onClick={(e) => { e.preventDefault(); navigate('home'); }}
        >
          <img src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="nav-logo-img" />
        </a>

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
          <li><a href="#que-es" className="nav-link" onClick={closeMenu}>Qué es SWAP</a></li>
          <li><a href="#temas" className="nav-link" onClick={closeMenu}>Temas</a></li>
          <li><a href="#proceso" className="nav-link" onClick={closeMenu}>El proceso</a></li>
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
