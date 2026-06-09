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
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let query = supabase.from('products').select('*');

  if (category && category !== 'todos') {
    query = query.eq('category', category);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
