'use client';
// CartDrawer — slide-in cart panel rendered as an accessible dialog.
//
// Props received from parent (TiendaView or ProductView):
//   isOpen        — bool: whether the drawer is visible
//   onClose       — () => void: close the drawer
//   cartItems     — array of cart line items
//   cartTotal     — number: sum of price * quantity for all items
//   onRemove      — (id, size) => void: remove a line item completely
//   onUpdateQty   — (id, size, newQty) => void: change quantity (qty=0 removes)
//   onClear       — () => void: empty the cart
//
// Accessibility patterns used:
//   role="dialog" + aria-modal="true"  — tells screen readers this is a modal
//   aria-label                         — names the dialog for screen readers
//   Escape key listener                — closes the drawer on Esc
//   autoFocus on close button          — moves focus into the dialog when it opens

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function CartDrawer({ isOpen, onClose, cartItems, cartTotal, onRemove, onUpdateQty, onClear }) {
  const closeButtonRef = useRef(null);

  // Move focus to the close button when the drawer opens.
  // Without this, focus stays behind the overlay and keyboard users can't interact.
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Close the drawer when the user presses Escape.
  // We clean up the listener when the component unmounts to avoid memory leaks.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay — always in the DOM so the CSS opacity transition works.
          The --open class makes it visible; without it, it's invisible + non-interactive. */}
      <div
        className={`cart-overlay${isOpen ? ' cart-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* The drawer itself — slides in from the right via CSS transform */}
      <aside
        className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="cart-header">
          <h2 className="cart-title">Tu carrito</h2>
          <button
            ref={closeButtonRef}
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="cart-items" aria-label="Productos en el carrito">
                {cartItems.map((item) => (
                  <li key={`${item.id}-${item.size ?? 'no-size'}`} className="cart-item">
                    <Image
                      src={`/assets/products/${item.id}.png`}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="cart-item-img"
                    />

                    <div className="cart-item-body">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      {item.size && (
                        <span className="cart-item-size">Talle: {item.size}</span>
                      )}
                      <span className="cart-item-unit-price">
                        ${item.price.toLocaleString('es-AR')} c/u
                      </span>
                    </div>

                    <div className="cart-item-controls">
                      {/* Quantity stepper */}
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty(item.id, item.size, item.quantity - 1)}
                        aria-label={`Reducir cantidad de ${item.name}`}
                      >
                        −
                      </button>
                      <span className="cart-qty-display" aria-label={`Cantidad: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty(item.id, item.size, item.quantity + 1)}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        +
                      </button>

                      {/* Remove button */}
                      <button
                        className="cart-remove-btn"
                        onClick={() => onRemove(item.id, item.size)}
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        🗑
                      </button>
                    </div>

                    <span className="cart-item-subtotal">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="cart-clear-btn" onClick={onClear}>
                Vaciar carrito
              </button>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            {/* Closes the drawer and navigates to the checkout page */}
            <Link
              href="/checkout"
              className="btn btn-primary cart-checkout-btn"
              onClick={onClose}
            >
              Ir al checkout
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
