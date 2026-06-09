import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request) {
  const { form, cartItems, total } = await request.json();

  if (!form?.nombre || !form?.email || !cartItems?.length) {
    return NextResponse.json({ error: 'Datos incompletos.' }, { status: 400 });
  }

  const supabase = getSupabase();

  // Insert the order and get back the generated id
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ buyer_name: form.nombre, buyer_email: form.email, total })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Insert each cart item linked to the order
  const items = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    size: item.size || null,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(items);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, orderId: order.id });
}
