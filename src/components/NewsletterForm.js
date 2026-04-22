'use client';
// NewsletterForm manages controlled input state — requires 'use client'.

import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresá un email válido.');
      return;
    }

    setError('');
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="newsletter-success" role="status">
        <span className="newsletter-success-icon" aria-hidden="true">✓</span>
        <p>¡Listo! Te sumaste. Nos vemos en la próxima.</p>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-input-row">
        <label htmlFor="newsletter-email" className="sr-only">Tu email</label>
        <input
          id="newsletter-email"
          type="email"
          className={`newsletter-input${error ? ' input-error' : ''}`}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        <button
          type="submit"
          className="newsletter-btn"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Enviando...' : 'Suscribirme'}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="newsletter-error" role="alert">{error}</p>
      )}
    </form>
  );
}

export default NewsletterForm;
