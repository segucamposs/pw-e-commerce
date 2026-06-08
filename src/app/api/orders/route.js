// Route Handler — POST /api/orders
//
// Receives the checkout form + cart contents, inserts a row into `orders`,
// then inserts one row per cart item into `order_items`.
// Returns { orderId } on success — used by E6 to create the Mercado Pago preference.

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      nombre, email, telefono,
      direccion, departamento, ciudad, provincia, codigo_postal,
      items, subtotal, shipping, total,
    } = body;

    // Step 1: insert the order. .select('id').single() returns the generated UUID.
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ nombre, email, telefono, direccion, departamento, ciudad, provincia, codigo_postal, subtotal, shipping, total })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // Step 2: insert all line items, each referencing the new order's UUID.
    const orderItems = items.map((item) => ({
      order_id:   order.id,
      product_id: item.product_id,
      name:       item.name,
      price:      item.price,
      size:       item.size ?? null,
      quantity:   item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      // If items fail, delete the parent order to avoid orphaned rows.
      await supabase.from('orders').delete().eq('id', order.id);
      throw itemsError;
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
