'use client';
// ProductView — product detail page (/tienda/[id]).
//
// Props:
//   productId — string from params.id in the route file
//
// Data fetching:
//   Calls GET /api/products (returns all) then filters client-side by id.
//   For E4, this is acceptable — no need for a dedicated /api/products/[id] route.
//   In E5, Supabase will add a proper single-product query.
//
// Cart state: useCart() is called here independently from TiendaView.
//   Both views share the same localStorage key ('swap-cart'), so adding a product
//   here and then navigating to /tienda shows it in the cart — no React Context needed.
//
// Size selection: required for apparel. Clicking "Agregar" without selecting a size
// shows an inline error message instead of silently failing.
//
// "Added" feedback: a 2-second flash message using role="status" + aria-live="polite"
// so screen readers announce it without interrupting the user.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import CartDrawer from '@/components/CartDrawer';
import useCart from '@/hooks/useCart';
import '@/merch.css';

function ProductView({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  // addedFeedback: briefly true after adding to cart, triggers the confirmation message.
  const [addedFeedback, setAddedFeedback] = useState(false);

  const {
    cartItems,
    isOpen: cartOpen,
    setIsOpen: setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  // Fetch the product on mount.
  // We call /api/products (all products) and filter by id here on the client.
  // This avoids creating a second API route for E4.
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === productId);
        setProduct(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    // Apparel requires a size — show an error if none selected.
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);

    // Flash the "¡Agregado!" confirmation for 2 seconds.
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Nav />
        <main className="tienda-page">
          <div className="container">
            <p className="tienda-loading" aria-live="polite">Cargando producto...</p>
          </div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Nav />
        <main className="tienda-page">
          <div className="container">
            <div className="tienda-empty" role="status">
              <p>Producto no encontrado.</p>
              <Link href="/tienda" className="btn btn-primary">
                ← Volver a la tienda
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />

      <main className="tienda-page">
        <div className="container">

        {/* Breadcrumb navigation */}
        <nav className="product-breadcrumb" aria-label="Migas de pan">
          <Link href="/tienda">← Volver a la tienda</Link>
        </nav>

        <div className="product-detail-grid">
          {/* Left column: product image */}
          <div className="product-detail-img" data-category={product.category}>
            <img
              src={`/assets/products/${product.id}.png`}
              alt={product.name}
              className="product-detail-photo"
            />
          </div>

          {/* Right column: product info */}
          <div className="product-detail-info">
            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
            <span className="product-category">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>

            <p className="product-detail-price">
              ${product.price.toLocaleString('es-AR')}
            </p>

            {/* Size selector — only shown for apparel (products where sizes !== null) */}
            {product.sizes && (
              <div className="product-sizes">
                <p className="product-sizes-label">
                  Talle
                  {sizeError && (
                    <span className="product-size-error" role="alert">
                      {' '}— Por favor elegí un talle
                    </span>
                  )}
                </p>
                <div className="product-sizes-grid">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`product-size-btn${selectedSize === size ? ' selected' : ''}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      aria-pressed={selectedSize === size}
                      aria-label={`Talle ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity stepper */}
            <div className="product-qty-controls">
              <span className="product-qty-label">Cantidad</span>
              <div className="product-qty-stepper">
                <button
                  className="product-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="product-qty-value" aria-live="polite" aria-label={`Cantidad: ${quantity}`}>
                  {quantity}
                </span>
                <button
                  className="product-qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Aumentar cantidad"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart action */}
            <div className="product-add-action">
              <button
                className="product-add-btn-large"
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </button>

              {/* role="status" + aria-live="polite" — screen readers announce this
                  without interrupting what the user is currently hearing. */}
              <span
                role="status"
                aria-live="polite"
                className={`product-added-feedback${addedFeedback ? ' product-added-feedback--visible' : ''}`}
              >
                {addedFeedback ? '¡Agregado al carrito!' : ''}
              </span>
            </div>

            <p className="product-stock">
              {product.stock > 0
                ? `${product.stock} unidades disponibles`
                : 'Sin stock'}
            </p>
          </div>
        </div>

        </div>{/* end .container */}
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onClear={clearCart}
      />

      {/* Floating cart button */}
      <button
        className="cart-trigger"
        onClick={() => setCartOpen(true)}
        aria-label={`Abrir carrito${cartCount > 0 ? ` (${cartCount} productos)` : ''}`}
      >
        🛒
        {cartCount > 0 && (
          <span className="cart-trigger-count" aria-hidden="true">
            {cartCount}
          </span>
        )}
      </button>
    </>
  );
}

export default ProductView;
