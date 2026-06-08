// Route Handler — GET /api/products
//
// In Next.js App Router, a file named route.js inside app/ defines an API endpoint.
// You export named functions for HTTP methods: GET, POST, PUT, DELETE.
// There is no JSX here — just JavaScript that returns a Response.
//
// URL examples:
//   /api/products                         → all products
//   /api/products?category=remeras        → only remeras
//   /api/products?search=hoodie           → matches name or description
//   /api/products?category=accesorios&search=gorra → combined filter

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category');
  const search = searchParams.get('search');

  // Start with a base query that selects all columns from the products table.
  // Methods like .eq() and .or() add WHERE clauses — they don't run yet.
  let query = supabase.from('products').select('*');

  // Filter by category (skip if 'todos' or not provided)
  if (category && category !== 'todos') {
    query = query.eq('category', category);
  }

  // Filter by search — .or() lets us check two columns at once.
  // ilike means case-insensitive LIKE. %search% means "contains search anywhere".
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Awaiting the query sends the SQL to Supabase and returns { data, error }.
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
