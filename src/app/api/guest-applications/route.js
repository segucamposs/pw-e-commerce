// Route Handler — POST /api/guest-applications
//
// Saves a guest application from the /invitado form to Supabase.
// Returns { ok: true } on success.

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { nombre, email, instagram, tema } = await request.json();

    // .select() is required so supabase-js surfaces RLS errors instead of
    // silently returning success when the row was actually rejected.
    const { error } = await supabase
      .from('guest_applications')
      .insert({ nombre, email, instagram, tema })
      .select();

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
