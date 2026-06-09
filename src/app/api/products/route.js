// Route Handler — GET /api/products
//
// In Next.js App Router, a file named route.js inside app/ defines an API endpoint.
// You export named functions for HTTP methods: GET, POST, PUT, DELETE.
// There is no JSX here — just JavaScript that returns a Response.
//
// URL examples:
//   /api/products                         → all 10 products
//   /api/products?category=remeras        → 2 products
//   /api/products?search=hoodie           → 1 product
//   /api/products?category=accesorios&search=gorra → 1 product

import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export function GET(request) {
  // new URL(request.url) parses the full URL string into an object with parts:
  // { pathname, searchParams, host, ... }
  // .searchParams is a URLSearchParams object — use .get('key') to read a param.
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category'); // null if not provided
  const search = searchParams.get('search');     // null if not provided

  let result = products;

  // Filter by category (skip if 'todos' or not provided)
  if (category && category !== 'todos') {
    result = result.filter((p) => p.category === category);
  }

  // Filter by search query (name or description, case-insensitive)
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // NextResponse.json() creates an HTTP response with:
  //   Content-Type: application/json
  //   Body: JSON.stringify(result)
  return NextResponse.json(result);
}
