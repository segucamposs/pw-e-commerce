'use client';
// ProductCard — displays a single product in the catalog grid.
//
// Props:
//   product     — product object from the API
//   onAddToCart — function(product, size, qty) from useCart in the parent
//
// Navigation:
//   Clicking anywhere on the card (image or text) navigates to the detail page.
//   The footer button is separate from the link:
//     - Apparel: "Ver opciones" also navigates to the detail page (size must be chosen there).
//     - Non-apparel: "+ Agregar" adds directly to cart without leaving the catalog.
//   e.stopPropagation() on the button prevents the card click from also firing.
//
// This component does NOT call useCart() itself — it receives the function as a prop.
// This keeps data flow unidirectional: TiendaView (owner) → ProductCard (consumer).

import Link from 'next/link';

function ProductCard({ product, onAddToCart }) {
  const handleQuickAdd = (e) => {
    // Stop the click from bubbling up — we don't want the card Link to fire too.
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product, null, 1);
  };

  return (
    <li className="product-card">
      {product.badge && (
        <span className="product-badge">{product.badge}</span>
      )}

      {/* Link wraps the image + text — clicking anywhere here goes to the detail page */}
      <Link href={`/tienda/${product.id}`} className="product-card-link" aria-label={`Ver ${product.name}`}>
        <div className="product-card-img" data-category={product.category}>
          <img
            src={`/assets/products/${product.id}.png`}
            alt={product.name}
            className="product-card-photo"
          />
        </div>

        <div className="product-card-body">
          <span className="product-category">{product.category}</span>
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
        </div>
      </Link>

      {/* Footer sits outside the Link so the button click doesn't trigger navigation */}
      <div className="product-card-footer">
        <span className="product-price">
          ${product.price.toLocaleString('es-AR')}
        </span>
        {product.sizes ? (
          <Link
            href={`/tienda/${product.id}`}
            className="product-add-btn"
            aria-label={`Ver opciones de ${product.name}`}
          >
            Ver opciones
          </Link>
        ) : (
          <button
            className="product-add-btn"
            onClick={handleQuickAdd}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            + Agregar
          </button>
        )}
      </div>
    </li>
  );
}

export default ProductCard;
