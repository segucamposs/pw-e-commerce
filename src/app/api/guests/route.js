import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request) {
  const { nombre, email, instagram, tema } = await request.json();

  if (!nombre || !email || !tema) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('guest_applications')
    .insert({ nombre, email, instagram: instagram || null, tema });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
