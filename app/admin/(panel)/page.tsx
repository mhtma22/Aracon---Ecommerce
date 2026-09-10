import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { 
  Package, 
  Layers, 
  Plus, 
  ArrowUpRight, 
  PackageCheck, 
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalProducts },
    { count: totalCategories },
    { data: products },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        price,
        old_price,
        is_active,
        created_at,
        categories ( name ),
        product_images ( url, position ),
        product_variants ( stock )
      `)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  // Calculate stock metrics from recent products
  const activeProducts = products?.filter((p) => p.is_active)?.length ?? 0;
  const lowStockCount = products?.filter((p) => {
    const totalStock = p.product_variants?.reduce((sum, v) => sum + (v.stock ?? 0), 0);
    return !totalStock || totalStock <= 2;
  })?.length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header & Quick Actions */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
              Panel General
            </h1>
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Resumen en tiempo real del catálogo, inventario y categorías.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <Layers className="w-3.5 h-3.5" />
            + Nueva Categoría
          </Link>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition focus-visible:ring-2 focus-visible:ring-white shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Link>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Métricas Principales">
        {/* Total Products */}
        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Total Productos</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {totalProducts ?? 0}
            </span>
            <p className="text-xs text-zinc-400 mt-1">Registrados en la plataforma</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Categorías</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {totalCategories ?? 0}
            </span>
            <p className="text-xs text-zinc-400 mt-1">Estructura de catálogo</p>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Alertas de Stock</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/30 border border-amber-800/40 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {lowStockCount}
            </span>
            <p className="text-xs text-amber-400/90 mt-1">Prendas con stock crítico</p>
          </div>
        </div>

        {/* Platform Status */}
        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Estado de Tienda</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">Online</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Sincronizado
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Catálogo público disponible</p>
          </div>
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="flex flex-col gap-4" aria-labelledby="ultimos-productos-title">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="ultimos-productos-title" className="text-lg font-semibold text-white tracking-tight">
              Últimos Productos Registrados
            </h2>
            <p className="text-xs text-zinc-400">
              Las adiciones más recientes a tu inventario.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition"
          >
            Ver catálogo completo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {(!products || products.length === 0) ? (
          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Aún no hay productos en la tienda</p>
              <p className="text-xs text-zinc-400 mt-0.5">Empieza creando tu primera prenda streetwear.</p>
            </div>
            <Link
              href="/admin/products/new"
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Crear primer producto
            </Link>
          </div>
        ) : (
          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl overflow-hidden divide-y divide-zinc-800/60">
            {products.map((product) => {
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
                  className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden flex-shrink-0">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[10px]">
                          Sin foto
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-100 truncate group-hover:text-white">
                          {product.name}
                        </p>
                        {!product.is_active && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            Inactivo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {categoryName} • <span className="font-mono text-zinc-400">/{product.slug}</span>
                      </p>
                    </div>
                  </div>

                  {/* Stock & Price */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 text-right">
                    <div>
                      <span className="text-sm font-bold text-white block">
                        S/ {Number(product.price).toFixed(2)}
                      </span>
                      {product.old_price && (
                        <span className="text-xs text-zinc-400 line-through">
                          S/ {Number(product.old_price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        totalStock && totalStock > 0
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {totalStock ?? 0} unds
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Tips or Shortcuts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Inventario Dinámico</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Recuerda registrar las variantes de color y talla al crear productos para permitir a los clientes elegir su estilo exacto.
            </p>
          </div>
        </div>

        <div className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Categorización Jerárquica</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Organiza colecciones madre (ej. Streetwear) y subcategorías (ej. Hoodies, Casacas) para mejorar la navegación del cliente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}