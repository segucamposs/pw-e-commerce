// useCart — custom hook that manages the shopping cart state.
//
// Key design decisions:
// 1. State is backed by localStorage so it survives page navigation and reloads.
// 2. This hook is called ONCE in the parent view (TiendaView or ProductView).
//    ProductCard and CartDrawer receive the cart data as props — they do NOT call
//    useCart() themselves. This keeps data flow unidirectional (top → down).
// 3. We intentionally avoid React Context to keep the code simple and explainable.
//    Context would require a Provider component wrapping the layout, which complicates
//    the Server Component architecture. localStorage is enough for E4.

import { useState, useEffect } from 'react';

function useCart() {
  // Always start with [] so the server render and the first client render
  // produce identical HTML — this prevents React hydration errors.
  // We load the real cart from localStorage in a useEffect after hydration.
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // `loaded` becomes true after the initial localStorage read so the sync
  // effect never overwrites stored data with the empty default [].
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage once, after the component mounts on the client.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('swap-cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch {
      // Ignore parse errors — start with an empty cart.
    }
    setLoaded(true);
  }, []);

  // Sync cart state to localStorage every time it changes, but only after
  // the initial load so we don't overwrite the stored cart with [].
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('swap-cart', JSON.stringify(cartItems));
    } catch {
      // localStorage can fail in private browsing or when storage is full.
      // We fail silently — the cart still works in memory for the session.
    }
  }, [cartItems, loaded]);

  // Add a product to the cart.
  // If the same product+size combo already exists, increment the quantity.
  // Otherwise, add a new line item.
  const addToCart = (product, size = null, qty = 1) => {
    setCartItems((prev) => {
      const key = `${product.id}-${size ?? 'no-size'}`;
      const existing = prev.find(
        (item) => `${item.id}-${item.size ?? 'no-size'}` === key
      );
      if (existing) {
        return prev.map((item) =>
          `${item.id}-${item.size ?? 'no-size'}` === key
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, size, quantity: qty },
      ];
    });
  };

  // Remove a line item completely (regardless of quantity).
  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => `${item.id}-${item.size ?? 'no-size'}` !== `${id}-${size ?? 'no-size'}`)
    );
  };

  // Change the quantity of an existing line item.
  // If the new quantity is 0 or less, the item is removed.
  const updateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        `${item.id}-${item.size ?? 'no-size'}` === `${id}-${size ?? 'no-size'}`
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  // Derived values — computed from cartItems on every render.
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems,
    cartLoaded: loaded,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };
}

export default useCart;
