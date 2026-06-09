// products.js — mock product data for the SWAP merch store.
// This is a plain JS module with no React or hooks — it can be imported
// anywhere: API route handlers (server), client components, server components.
//
// In E5, this array will be replaced by a Supabase database query.
// The shape of each object stays the same so nothing else needs to change.

export const CATEGORIES = ['todos', 'remeras', 'buzos', 'accesorios'];

export const products = [
  {
    id: 'swap-tee-negra',
    name: 'Remera SWAP — Negro',
    category: 'remeras',
    price: 8500,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    badge: 'Más vendido',
    description: 'La remera oficial de SWAP. 100% algodón peinado, corte unisex. Diseño con el logo SWAP en el pecho.',
  },
  {
    id: 'swap-hoodie',
    name: 'Hoodie SWAP Clásico',
    category: 'buzos',
    price: 18000,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    badge: 'Nuevo',
    description: 'Buzo con capucha, frisa adentro. Bordado con el logo SWAP en el pecho izquierdo. Ideal para grabar episodios.',
  },
  {
    id: 'swap-crewneck',
    name: 'Crewneck SWAP',
    category: 'buzos',
    price: 15000,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 8,
    badge: null,
    description: 'Buzo cuello redondo con diseño minimalista. Frisa adentro, logo SWAP bordado en el pecho.',
  },
  {
    id: 'swap-gorra',
    name: 'Gorra SWAP — Dad Hat',
    category: 'accesorios',
    price: 6500,
    sizes: null,
    stock: 30,
    badge: null,
    description: 'Gorra estilo dad hat, ajuste con hebilla. Bordado "SWAP" en frente. Talle único.',
  },
  {
    id: 'swap-stickers',
    name: 'Pack de Stickers x5',
    category: 'accesorios',
    price: 2500,
    sizes: null,
    stock: 50,
    badge: null,
    description: 'Pack de 5 stickers con diseños exclusivos de SWAP. Resistentes al agua. Para la laptop, termo o donde quieras.',
  },
];
