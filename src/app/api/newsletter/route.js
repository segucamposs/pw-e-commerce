// Route Handler — POST /api/newsletter
//
// Saves a newsletter subscription to Supabase.
// The email column has a UNIQUE constraint, so submitting the same email twice
// produces Postgres error code '23505'. We catch that and return 200 OK with
// { already: true } instead of an error — re-subscribing is not a failure.

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { nombre, apellido, email } = await request.json();

    // .select() is required so supabase-js surfaces RLS errors instead of
    // silently returning success when the row was actually rejected.
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ nombre, apellido, email })
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ ok: true, already: true });
      }
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
