import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import GuestPage from './pages/GuestPage';
import WhatsAppFab from './components/WhatsAppFab';
import './styles.css';

// App is the root component. It holds the current "page" in state and
// renders either HomePage or GuestPage — no page reload needed.
function App() {
  const [page, setPage] = useState('home');

  // navigate() is passed down as a prop to any component that needs
  // to switch pages. It updates state and scrolls to the top.
  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  // Update the browser tab title whenever the page changes.
  useEffect(() => {
    document.title = page === 'guest'
      ? 'Para invitados — SWAP Podcast'
      : 'SWAP Podcast';
  }, [page]);

  return (
    <>
      {page === 'home'
        ? <HomePage navigate={navigate} />
        : <GuestPage navigate={navigate} />
      }
      <WhatsAppFab />
    </>
  );
}

export default App;
