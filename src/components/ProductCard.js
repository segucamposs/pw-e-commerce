'use client';
// ProductCard — displays a single product in the catalog grid.
//
// Props:
//   product    — product object from the API
//   onAddToCart — function(product, size, qty) from useCart in the parent
//
// Quick-add logic:
//   - Apparel (product.sizes !== null): clicking the button navigates to the
//     detail page where the user picks a size. We never add without a size.
//   - Non-apparel (product.sizes === null): adds directly to cart with size=null.
//
// This component does NOT call useCart() itself — it receives the function as a prop.
// This keeps data flow unidirectional: TiendaView (owner) → ProductCard (consumer).

import { useRouter } from 'next/navigation';

function ProductCard({ product, onAddToCart }) {
  const router = useRouter();

  const handleAdd = () => {
    if (product.sizes) {
      // Has sizes — send to detail page to pick one first.
      router.push(`/tienda/${product.id}`);
    } else {
      // No sizes — add directly to cart.
      onAddToCart(product, null, 1);
    }
  };

  return (
    <li className="product-card">
      {/* Image placeholder — CSS gradient based on category via data-category attribute */}
      <div className="product-card-img" data-category={product.category} aria-hidden="true">
        <span className="product-card-icon">{getCategoryIcon(product.category)}</span>
      </div>

      {product.badge && (
        <span className="product-badge">{product.badge}</span>
      )}

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>

        <div className="product-card-footer">
          <span className="product-price">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <button
            className="product-add-btn"
            onClick={handleAdd}
            aria-label={
              product.sizes
                ? `Ver opciones de ${product.name}`
                : `Agregar ${product.name} al carrito`
            }
          >
            {product.sizes ? 'Ver opciones' : '+ Agregar'}
          </button>
        </div>
      </div>
    </li>
  );
}

// Returns a text emoji/symbol for the category image placeholder.
function getCategoryIcon(category) {
  const icons = {
    remeras: '👕',
    buzos: '🧥',
    accesorios: '🎩',
    digital: '💻',
  };
  return icons[category] ?? '📦';
}

export default ProductCard;
