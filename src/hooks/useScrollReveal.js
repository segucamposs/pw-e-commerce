import { useEffect } from 'react';

// Custom hook: watches all elements with the "reveal" class and adds
// "revealed" when they enter the viewport, triggering a CSS animation.
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // stop watching once revealed
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Cleanup: disconnect the observer when the component unmounts.
    return () => observer.disconnect();
  }, []); // [] = run once after the component first renders
}

export default useScrollReveal;
