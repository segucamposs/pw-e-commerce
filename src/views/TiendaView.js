'use client';
// TiendaView — the main product catalog page (/tienda).
//
// This is the "owner" of cart state for the catalog. It calls useCart() once
// and passes the resulting functions down as props to ProductCard and CartDrawer.
// Neither child calls useCart() — they just receive what they need. This is
// called "lifting state up" and keeps data flow predictable (top → down).
//
// Data fetching pattern:
//   - useEffect fires when search or activeCategory changes.
//   - It calls /api/products with query params and updates the products state.
//   - A debounce delay (300ms) prevents firing on every single keystroke.

import { useState, useEffect, useRef } from 'react';
import Nav from '@/components/Nav';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import useCart from '@/hooks/useCart';
import { CATEGORIES } from '@/data/products';
import '@/merch.css';

function TiendaView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  // useCart() is called ONCE here. All cart state lives in this component.
  // ProductCard and CartDrawer receive cart functions as props — they don't
  // call useCart() themselves. This avoids multiple isolated state instances.
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

  // Debounce ref — stores the timeout ID so we can cancel it on the next keystroke.
  // useRef is perfect here: storing a mutable value that doesn't cause a re-render.
  const debounceRef = useRef(null);

  // Fetch products whenever search or activeCategory changes.
  // The debounce prevents firing a fetch on every keystroke (e.g. typing "hoodie"
  // would fire 6 requests without it). Instead, we wait 300ms after the user stops.
  useEffect(() => {
    // Cancel any pending fetch scheduled from the previous keystroke.
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeCategory !== 'todos') params.set('category', activeCategory);
      if (search.trim()) params.set('search', search.trim());

      fetch(`/api/products?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    // Cleanup: cancel the timeout if the component unmounts mid-debounce.
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, activeCategory]);

  return (
    <>
      <Nav />

      <main className="tienda-page">
        <div className="container">

        <section className="tienda-hero">
          <h1 className="tienda-title">Tienda SWAP</h1>
          <p className="tienda-subtitle">
            Merch oficial del podcast. Llevate un pedazo de SWAP.
          </p>
        </section>

        <div className="tienda-controls">
          {/* Controlled input — React owns the value via state.
              Every keystroke calls setSearch, which re-renders and triggers the useEffect. */}
          <input
            type="search"
            className="tienda-search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />

          {/* Category filter tabs — role="tablist" for accessibility */}
          <div className="tienda-filters" role="tablist" aria-label="Filtrar por categoría">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                className="tienda-filter-btn"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="tienda-loading" aria-live="polite">Cargando productos...</p>
        ) : products.length === 0 ? (
          <div className="tienda-empty" role="status">
            <p>No encontramos productos para tu búsqueda.</p>
            <button
              className="btn btn-primary"
              onClick={() => { setSearch(''); setActiveCategory('todos'); }}
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <ul className="products-grid" aria-label="Productos disponibles">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </ul>
        )}

        </div>{/* end .container */}
      </main>

      {/* CartDrawer receives all cart data as props — it doesn't own the state */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onClear={clearCart}
      />

      {/* Floating cart button — always visible in the bottom-right corner */}
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

export default TiendaView;
