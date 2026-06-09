import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  const { nombre, apellido, email } = await request.json();

  if (!nombre || !apellido || !email) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('newsletter_subscriptions')
    .insert({ nombre, apellido, email });

  if (error) {
    // Unique constraint violation — email already subscribed
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Este email ya está suscripto.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
