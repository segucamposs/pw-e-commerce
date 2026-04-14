import { useState } from 'react';

// NewsletterForm is a controlled form component.
// "Controlled" means React state manages the input value at all times —
// the displayed value always reflects what's in state, not raw DOM.
// status drives what the user sees: the form, a loading state, or a success message.
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

    // Simulated async call — will connect to a real endpoint in E5.
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
