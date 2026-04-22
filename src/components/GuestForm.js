'use client';
// GuestForm manages its own state — inputs, validation errors, submit status.
// Any component that calls useState must be a Client Component.

import { useState } from 'react';

function GuestForm() {
  const [form, setForm] = useState({ nombre: '', email: '', instagram: '', tema: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Por favor ingresá tu nombre.';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Por favor ingresá un email válido.';
    if (!form.tema.trim()) newErrors.tema = 'Contanos de qué hablarías.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      setStatus('ok');
      setForm({ nombre: '', email: '', instagram: '', tema: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="g-form"
      id="contacto-form"
      noValidate
      aria-label="Formulario para postularse como invitado de SWAP Podcast"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">
          Nombre completo <span aria-hidden="true">*</span>
        </label>
        <input
          type="text" id="nombre" name="nombre"
          className={`form-input${errors.nombre ? ' input-error' : ''}`}
          placeholder="Tu nombre" required autoComplete="name"
          aria-required="true" value={form.nombre} onChange={handleChange}
        />
        {errors.nombre && (
          <span className="form-error" role="alert" aria-live="polite">{errors.nombre}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          type="email" id="email" name="email"
          className={`form-input${errors.email ? ' input-error' : ''}`}
          placeholder="tu@email.com" required autoComplete="email"
          aria-required="true" value={form.email} onChange={handleChange}
        />
        {errors.email && (
          <span className="form-error" role="alert" aria-live="polite">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="instagram" className="form-label">
          Instagram <span className="form-optional">(opcional)</span>
        </label>
        <input
          type="text" id="instagram" name="instagram"
          className="form-input" placeholder="@usuario"
          autoComplete="off" value={form.instagram} onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tema" className="form-label">
          ¿De qué hablarías? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="tema" name="tema"
          className={`form-input form-textarea${errors.tema ? ' input-error' : ''}`}
          placeholder="Contanos brevemente tu historia y el tema que traerías al podcast..."
          required rows="4" aria-required="true"
          value={form.tema} onChange={handleChange}
        ></textarea>
        {errors.tema && (
          <span className="form-error" role="alert" aria-live="polite">{errors.tema}</span>
        )}
      </div>

      <button type="submit" className="cta-btn g-form-submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Quiero participar →'}
      </button>

      {status === 'ok' && (
        <p className="form-status status-ok" role="status" aria-live="polite">
          ¡Gracias! Te vamos a contactar pronto.
        </p>
      )}
      {status === 'error' && (
        <p className="form-status status-error" role="status" aria-live="polite">
          Algo salió mal. Escribinos por Instagram.
        </p>
      )}
    </form>
  );
}

export default GuestForm;
