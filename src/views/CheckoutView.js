'use client';
// CheckoutView — the checkout page UI.
//
// Reads cart state from useCart() (backed by localStorage — same key as TiendaView).
// All form fields are controlled inputs using useState.
// handleSubmit is a no-op placeholder — wired to Mercado Pago in E6.
//
// Layout: two-column grid.
//   Left  — form sections: Contacto, Envío, Pago
//   Right — sticky order summary + CTA button
//
// The submit button lives in the right column but targets the form via
// the HTML5 `form` attribute pointing to id="checkout-form".

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import useCart from '@/hooks/useCart';
import '@/merch.css';

// Argentine provinces for the shipping select
const PROVINCIAS = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
];

// Free shipping threshold (ARS)
const FREE_SHIPPING_THRESHOLD = 20000;
const SHIPPING_COST = 3500;

function CheckoutView() {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();

  // If the cart is empty, send the user back to the store.
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/tienda');
    }
  }, [cartItems, router]);

  // Controlled form state — one object for all fields.
  // When E6 connects Mercado Pago, handleSubmit receives this object as-is.
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    departamento: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
  });

  // Single change handler for all inputs — reads name attribute to update the right key.
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TODO E6: replace this stub with Mercado Pago preference creation + redirect.
  // Expected flow:
  //   1. POST /api/checkout with { form, cartItems }
  //   2. Server creates an MP preference and returns { init_point: URL }
  //   3. router.push(init_point) sends user to MP checkout
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder — no action yet
  };

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartTotal + shipping;

  // Don't render the page content while redirecting (empty cart)
  if (cartItems.length === 0) return null;

  return (
    <>
      <Nav />

      <main className="checkout-page">
        <div className="container">

          <Link href="/tienda" className="checkout-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 8H2M7 3L2 8l5 5" />
            </svg>
            Volver a la tienda
          </Link>

          <div className="checkout-grid">

            {/* ─── Left column: form ──────────────────────────── */}
            <form
              id="checkout-form"
              className="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de checkout"
            >

              {/* Contacto */}
              <section className="checkout-section" aria-labelledby="section-contacto">
                <h2 id="section-contacto" className="checkout-section-title">Contacto</h2>
                <div className="checkout-fields">
                  <div className="checkout-field checkout-field--full">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Juan García"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="juan@gmail.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+54 11 1234-5678"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Envío */}
              <section className="checkout-section" aria-labelledby="section-envio">
                <h2 id="section-envio" className="checkout-section-title">Dirección de envío</h2>
                <div className="checkout-fields">
                  <div className="checkout-field checkout-field--full">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                      id="direccion"
                      name="direccion"
                      type="text"
                      value={form.direccion}
                      onChange={handleChange}
                      placeholder="Av. Corrientes 1234"
                      autoComplete="street-address"
                      required
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="departamento">
                      Piso / Depto{' '}
                      <span className="checkout-optional">(opcional)</span>
                    </label>
                    <input
                      id="departamento"
                      name="departamento"
                      type="text"
                      value={form.departamento}
                      onChange={handleChange}
                      placeholder="3° B"
                      autoComplete="address-line2"
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                      id="ciudad"
                      name="ciudad"
                      type="text"
                      value={form.ciudad}
                      onChange={handleChange}
                      placeholder="Buenos Aires"
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="provincia">Provincia</label>
                    <select
                      id="provincia"
                      name="provincia"
                      value={form.provincia}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccioná una provincia</option>
                      {PROVINCIAS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="codigoPostal">Código postal</label>
                    <input
                      id="codigoPostal"
                      name="codigoPostal"
                      type="text"
                      value={form.codigoPostal}
                      onChange={handleChange}
                      placeholder="1043"
                      autoComplete="postal-code"
                      required
                      maxLength={8}
                    />
                  </div>
                </div>
              </section>

              {/* Pago */}
              <section className="checkout-section" aria-labelledby="section-pago">
                <h2 id="section-pago" className="checkout-section-title">Pago</h2>
                <div className="checkout-payment-box">
                  {/* Mercado Pago badge */}
                  <div className="checkout-mp-badge" aria-label="Método de pago: Mercado Pago">
                    {/* MP logo — inline SVG to avoid external dependencies */}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <circle cx="11" cy="11" r="11" fill="#009EE3" />
                      <text x="11" y="15.5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="9" fontFamily="sans-serif">MP</text>
                    </svg>
                    <span>Mercado Pago</span>
                    <span className="checkout-mp-selected">Seleccionado</span>
                  </div>
                  <p className="checkout-payment-note">
                    Al confirmar tu pedido serás redirigido a Mercado Pago para completar
                    el pago de forma segura. Aceptamos tarjetas de crédito, débito y dinero en cuenta.
                  </p>
                </div>
              </section>

            </form>

            {/* ─── Right column: order summary ────────────────── */}
            <aside className="checkout-summary" aria-label="Resumen del pedido">
              <h2 className="checkout-summary-title">Resumen del pedido</h2>

              {/* Item list */}
              <ul className="checkout-items" aria-label="Productos en tu pedido">
                {cartItems.map((item) => (
                  <li
                    key={`${item.id}-${item.size ?? 'no-size'}`}
                    className="checkout-item"
                  >
                    <div className="checkout-item-img">
                      <img
                        src={`/assets/products/${item.id}.png`}
                        alt={item.name}
                        width={56}
                        height={56}
                      />
                      <span className="checkout-item-qty" aria-label={`Cantidad: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="checkout-item-info">
                      <span className="checkout-item-name">{item.name}</span>
                      {item.size && (
                        <span className="checkout-item-size">Talle: {item.size}</span>
                      )}
                    </div>
                    <span className="checkout-item-price">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="checkout-totals">
                <div className="checkout-total-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="checkout-total-row">
                  <span>Envío</span>
                  <span className={shipping === 0 ? 'checkout-shipping-free' : ''}>
                    {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}`}
                  </span>
                </div>
                {cartTotal >= FREE_SHIPPING_THRESHOLD && (
                  <p className="checkout-shipping-note">
                    Envío gratis en compras mayores a $20.000
                  </p>
                )}
                <div className="checkout-total-row checkout-total-row--final">
                  <span>Total</span>
                  <span>${total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Submit — the `form` attribute links this button to the form above */}
              <button
                type="submit"
                form="checkout-form"
                className="btn btn-primary checkout-submit-btn"
              >
                Pagar con Mercado Pago
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </button>

              <p className="checkout-secure-note">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Pago 100% seguro con Mercado Pago
              </p>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}

export default CheckoutView;
