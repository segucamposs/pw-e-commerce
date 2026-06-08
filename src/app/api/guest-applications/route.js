// Route Handler — POST /api/guest-applications
//
// Saves a guest application from the /invitado form to Supabase.
// Returns { ok: true } on success.

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { nombre, email, instagram, tema } = await request.json();

    const { error } = await supabase
      .from('guest_applications')
      .insert({ nombre, email, instagram, tema });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
