'use client';
// NewsletterForm manages controlled input state — requires 'use client'.

import { useState } from 'react';

function NewsletterForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) { setError('Ingresá tu nombre.'); return; }
    if (!apellido.trim()) { setError('Ingresá tu apellido.'); return; }
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
        <p>¡Gracias por sumarte a la comunidad de SWAP!</p>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-nombre" className="sr-only">Nombre</label>
      <input
        id="newsletter-nombre"
        type="text"
        className={`newsletter-input${error && !nombre.trim() ? ' input-error' : ''}`}
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        aria-required="true"
      />
      <label htmlFor="newsletter-apellido" className="sr-only">Apellido</label>
      <input
        id="newsletter-apellido"
        type="text"
        className={`newsletter-input${error && !apellido.trim() ? ' input-error' : ''}`}
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        aria-required="true"
      />
      <label htmlFor="newsletter-email" className="sr-only">Tu email</label>
      <input
        id="newsletter-email"
        type="email"
        className={`newsletter-input${error && nombre.trim() && apellido.trim() ? ' input-error' : ''}`}
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-required="true"
        aria-describedby={error ? 'newsletter-error' : undefined}
      />
      <button
        type="submit"
        className="newsletter-btn newsletter-btn--centered"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Enviando...' : 'Suscribirme'}
      </button>
      {error && (
        <p id="newsletter-error" className="newsletter-error" role="alert">{error}</p>
      )}
    </form>
  );
}

export default NewsletterForm;
