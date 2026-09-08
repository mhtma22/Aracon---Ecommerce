import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

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
      <div className="p-8">
        <p className="text-red-500">Error al cargar productos: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-neutral-800 font-semibold">Productos</h1>
        <Link
          href="/admin/products/nuevo"
          className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition"
        >
          + Nuevo producto
        </Link>
      </div>

      {products?.length === 0 && (
        <p className="text-neutral-500">Aún no hay productos creados.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => {
          const image = product.product_images?.sort(
            (a, b) => a.position - b.position
          )[0];
          const totalStock = product.product_variants?.reduce(
            (sum, v) => sum + (v.stock ?? 0),
            0
          );

          return (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white"
            >
              <div className="aspect-square bg-neutral-100 relative">
                {image ? (
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                    Sin imagen
                  </div>
                )}
                {!product.is_active && (
                  <span className="absolute top-2 left-2 bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                    Inactivo
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-neutral-500 text-xs">
                  {product.categories?.map((c) => c.name).join(", ") ?? "Sin categoría"}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-semibold text-sm">
                      S/ {product.price.toFixed(2)}
                    </span>
                    {product.old_price && (
                      <span className="text-neutral-400 text-xs line-through ml-1">
                        S/ {product.old_price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      totalStock && totalStock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {totalStock ?? 0} und
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}