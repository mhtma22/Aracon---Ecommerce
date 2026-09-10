-- Ejecutar primero para detectar datos que impedirían crear la unicidad.
select
  product_id,
  coalesce(color, '') as color,
  coalesce(size, '') as size,
  count(*) as duplicates
from public.product_variants
group by product_id, coalesce(color, ''), coalesce(size, '')
having count(*) > 1;

alter table public.product_variants
  add constraint product_variants_stock_non_negative
  check (stock >= 0);

create unique index if not exists idx_product_variants_unique_option
on public.product_variants (
  product_id,
  coalesce(trim(color), ''),
  coalesce(trim(size), '')
);
