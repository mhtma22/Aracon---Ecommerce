-- Ejecutar en el SQL Editor de Supabase.
-- El rol se almacena en auth.users.raw_app_meta_data.

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

drop policy if exists "Solo admin escribe categorías" on public.categories;
drop policy if exists "Solo admin escribe productos" on public.products;
drop policy if exists "Solo admin escribe imágenes" on public.product_images;
drop policy if exists "Solo admin escribe variantes" on public.product_variants;

create policy "Solo admins escriben categorías"
on public.categories for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Solo admins escriben productos"
on public.products for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Solo admins escriben imágenes"
on public.product_images for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Solo admins escriben variantes"
on public.product_variants for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admin puede subir imágenes" on storage.objects;

create policy "Admins suben imágenes de productos"
on storage.objects for insert to authenticated
with check (bucket_id = 'products' and public.is_admin());

create policy "Admins actualizan imágenes de productos"
on storage.objects for update to authenticated
using (bucket_id = 'products' and public.is_admin())
with check (bucket_id = 'products' and public.is_admin());

create policy "Admins eliminan imágenes de productos"
on storage.objects for delete to authenticated
using (bucket_id = 'products' and public.is_admin());
