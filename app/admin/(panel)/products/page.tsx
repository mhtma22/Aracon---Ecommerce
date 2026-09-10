import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Package, Plus, Sparkles, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Gestión de Productos | Admin Aracon",
  description: "Administra las prendas, precios, variantes e inventario de la tienda.",
};

export default async function ProductosAdminPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      price,
      old_price,
      is_active,
      categories ( name ),
      product_images ( url, position ),
      product_variants ( stock )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 flex items-center gap-3 text-rose-300">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">Error al cargar productos: {error.message}</p>
      </div>
    );
  }

  const totalCount = products?.length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Header bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
              Productos
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
              {totalCount} {totalCount === 1 ? "ítem" : "ítems"}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Gestiona prendas, existencias, precios y variantes de la tienda.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition focus-visible:ring-2 focus-visible:ring-white shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Link>
      </header>

      {/* Empty State */}
      {totalCount === 0 && (
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">Catálogo vacío</p>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Aún no has agregado ninguna prenda a tu catálogo. Empieza creando tu primer producto ahora.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition"
          >
            <Plus className="w-4 h-4" />
            Crear producto
          </Link>
        </div>
      )}

      {/* Minimalist Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products?.map((product) => {
          const image = product.product_images?.sort(
            (a, b) => a.position - b.position
          )[0];
          const totalStock = product.product_variants?.reduce(
            (sum, v) => sum + (v.stock ?? 0),
            0
          );
          const categoryName = (product.categories as unknown as { name?: string })?.name || "Sin categoría";

          return (
            <div
              key={product.id}
              className="bg-[#111114] border border-zinc-800/70 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-200"
            >
              {/* Image Frame */}
              <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                {image ? (
                  <Image
                    src={image.url}
                    alt={product.name}
                    width={300}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-medium">
                    Sin imagen
                  </div>
                )}

                {/* Status Badges Overlay */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  {!product.is_active ? (
                    <span className="bg-zinc-900/90 text-zinc-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-zinc-700/80 backdrop-blur-sm">
                      Inactivo
                    </span>
                  ) : (
                    <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-emerald-800/60 backdrop-blur-sm">
                      Activo
                    </span>
                  )}
                </div>

                {/* Stock Indicator Top Right */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm border ${
                      totalStock && totalStock > 0
                        ? "bg-zinc-900/90 text-zinc-200 border-zinc-700/80"
                        : "bg-rose-950/90 text-rose-400 border-rose-800/60"
                    }`}
                  >
                    {totalStock ?? 0} unds
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {categoryName}
                  </span>
                  <h3 className="font-semibold text-sm text-zinc-100 truncate group-hover:text-white transition-colors mt-0.5">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 truncate">
                    /{product.slug}
                  </p>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-zinc-800/60">
                  <div>
                    <span className="font-bold text-sm text-white">
                      S/ {Number(product.price).toFixed(2)}
                    </span>
                    {product.old_price && (
                      <span className="text-zinc-400 text-xs line-through ml-1.5">
                        S/ {Number(product.old_price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition">
                    ID: {product.id.slice(0, 6)}...
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
