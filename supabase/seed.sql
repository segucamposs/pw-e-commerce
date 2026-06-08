-- ─────────────────────────────────────────────────────────────────────────────
-- E5 — Supabase schema, RLS policies, and seed data for pw-e-commerce.
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── products ──────────────────────────────────────────────────────────────────
-- Stores the SWAP merch catalog. id is a human-readable slug (e.g. 'swap-hoodie')
-- so URLs stay clean: /tienda/swap-hoodie.
-- sizes is a text[] (Postgres array) — null for one-size items like the gorra.

create table if not exists products (
  id          text        primary key,
  name        text        not null,
  category    text        not null,
  price       int         not null,
  sizes       text[],
  stock       int         not null default 0,
  badge       text,
  description text        not null,
  created_at  timestamptz not null default now()
);

alter table products enable row level security;

-- Anyone can read products (public catalog).
create policy "Public can read products"
  on products for select
  using (true);

-- ── orders ────────────────────────────────────────────────────────────────────
-- One row per checkout submission. Customer info + shipping address are stored
-- directly (no separate address table — simpler for this project scope).
-- status: 'pending' → 'paid' or 'failed' (flipped by the MP webhook in E6).

create table if not exists orders (
  id               uuid        primary key default gen_random_uuid(),
  nombre           text        not null,
  email            text        not null,
  telefono         text        not null,
  direccion        text        not null,
  departamento     text,
  ciudad           text        not null,
  provincia        text        not null,
  codigo_postal    text        not null,
  subtotal         int         not null,
  shipping         int         not null,
  total            int         not null,
  status           text        not null default 'pending',
  mp_preference_id text,
  created_at       timestamptz not null default now()
);

alter table orders enable row level security;

-- Browser can INSERT (to create an order) but cannot SELECT (protects PII).
create policy "Anon can insert orders"
  on orders for insert
  with check (true);

-- ── order_items ───────────────────────────────────────────────────────────────
-- Each line item in an order. name and price are snapshots — copied at order time
-- so historical orders stay accurate even if the product is later renamed or repriced.

create table if not exists order_items (
  id         uuid        primary key default gen_random_uuid(),
  order_id   uuid        not null references orders(id) on delete cascade,
  product_id text        not null references products(id),
  name       text        not null,
  price      int         not null,
  size       text,
  quantity   int         not null,
  created_at timestamptz not null default now()
);

alter table order_items enable row level security;

create policy "Anon can insert order items"
  on order_items for insert
  with check (true);

-- ── guest_applications ────────────────────────────────────────────────────────
-- Submissions from the /invitado page. Used to contact potential podcast guests.

create table if not exists guest_applications (
  id         uuid        primary key default gen_random_uuid(),
  nombre     text        not null,
  email      text        not null,
  instagram  text,
  tema       text        not null,
  created_at timestamptz not null default now()
);

alter table guest_applications enable row level security;

create policy "Anon can insert guest applications"
  on guest_applications for insert
  with check (true);

-- ── newsletter_subscribers ────────────────────────────────────────────────────
-- Email list for SWAP updates. email is UNIQUE — re-subscribing the same address
-- returns a Postgres error code 23505 (unique violation), handled gracefully in the
-- /api/newsletter route.

create table if not exists newsletter_subscribers (
  id         uuid        primary key default gen_random_uuid(),
  nombre     text        not null,
  apellido   text        not null,
  email      text        not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Anon can insert newsletter subscribers"
  on newsletter_subscribers for insert
  with check (true);

-- ── Seed: products ────────────────────────────────────────────────────────────
-- Mirrors the data that was in src/data/products.js before E5.
-- Run once. on conflict (id) do nothing makes it safe to re-run.

insert into products (id, name, category, price, sizes, stock, badge, description) values
  (
    'swap-tee-negra',
    'Remera SWAP — Negro',
    'remeras',
    8500,
    ARRAY['S','M','L','XL'],
    20,
    'Más vendido',
    'La remera oficial de SWAP. 100% algodón peinado, corte unisex. Diseño con el logo SWAP en el pecho.'
  ),
  (
    'swap-hoodie',
    'Hoodie SWAP Clásico',
    'buzos',
    18000,
    ARRAY['S','M','L','XL'],
    10,
    'Nuevo',
    'Buzo con capucha, frisa adentro. Bordado con el logo SWAP en el pecho izquierdo. Ideal para grabar episodios.'
  ),
  (
    'swap-crewneck',
    'Crewneck SWAP',
    'buzos',
    15000,
    ARRAY['S','M','L','XL'],
    8,
    NULL,
    'Buzo cuello redondo con diseño minimalista. Frisa adentro, logo SWAP bordado en el pecho.'
  ),
  (
    'swap-gorra',
    'Gorra SWAP — Dad Hat',
    'accesorios',
    6500,
    NULL,
    30,
    NULL,
    'Gorra estilo dad hat, ajuste con hebilla. Bordado "SWAP" en frente. Talle único.'
  ),
  (
    'swap-stickers',
    'Pack de Stickers x5',
    'accesorios',
    2500,
    NULL,
    50,
    NULL,
    'Pack de 5 stickers con diseños exclusivos de SWAP. Resistentes al agua. Para la laptop, termo o donde quieras.'
  )
on conflict (id) do nothing;
