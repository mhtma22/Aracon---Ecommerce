create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products
  add column if not exists brand_id uuid references public.brands(id) on delete set null;

create index if not exists idx_products_brand on public.products(brand_id);

alter table public.brands enable row level security;

create policy "Lectura pública de marcas"
on public.brands for select
to anon, authenticated
using (is_active = true or public.is_admin());

create policy "Solo admins gestionan marcas"
on public.brands for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
