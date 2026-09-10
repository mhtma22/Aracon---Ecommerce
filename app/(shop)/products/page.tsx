import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, Sparkles, SlidersHorizontal } from 'lucide-react';

export const metadata = {
  title: 'Colección Completa | Aracon Streetwear',
  description: 'Explora toda la selección de prendas streetwear y moda urbana de edición limitada en Aracon.',
};

export default async function ProductsShopPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        price,
        old_price,
        is_active,
        categories ( name ),
        product_images ( url, position ),
        product_variants ( stock )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabase.from('categories').select('id, name, slug').order('name'),
  ]);

  // Fallback demo products if Supabase table is empty so the page is never blank
  const fallbackProducts = [
    {
      id: 'demo-1',
      name: 'Polera Oversize Acid Wash',
      slug: 'polera-oversize-acid-wash',
      price: 149.00,
      old_price: 199.00,
      categoryName: 'Streetwear',
      image: '/ropacasual.webp',
      badge: 'Nuevo'
    },
    {
      id: 'demo-2',
      name: 'Casaca Varsity Clásica',
      slug: 'casaca-varsity-clasica',
      price: 289.00,
      old_price: 349.00,
      categoryName: 'Edición Limitada',
      image: '/ropaformal.webp',
      badge: 'Destacado'
    },
    {
      id: 'demo-3',
      name: 'Pantalón Cargo Táctico Fit',
      slug: 'pantalon-cargo-tactico-fit',
      price: 179.00,
      old_price: 229.00,
      categoryName: 'Urban Fit',
      image: '/ropagym.avif',
      badge: 'Popular'
    },
    {
      id: 'demo-4',
      name: 'Hoodie Minimalista Algodón Pima',
      slug: 'hoodie-minimalista-algodon-pima',
      price: 169.00,
      old_price: 219.00,
      categoryName: 'Streetwear',
      image: '/ropafiesta.webp',
      badge: 'Tendencia'
    }
  ];

  const hasDbProducts = products && products.length > 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#5A6A63] mb-6">
        <Link href="/" className="hover:text-[#2A2F2D] transition">Inicio</Link>
        <span>/</span>
        <span className="text-[#2A2F2D] font-medium">Colección</span>
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#D6DCD5] mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
            Catálogo General
          </span>
          <h1 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A2F2D] mt-1"
            style={{ fontFamily: 'Lexend, sans-serif' }}
          >
            Colección Streetwear
          </h1>
          <p className="text-sm text-[#5A6A63] mt-1">
            Prendas seleccionadas con atención al corte, texturas y detalles.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#5A6A63]">
          <span className="bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#D6DCD5]">
            {hasDbProducts ? products.length : fallbackProducts.length} prendas disponibles
          </span>
        </div>
      </header>

      {/* Filter tags */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button className="bg-[#2A2F2D] text-[#F4F5F2] text-xs font-medium px-4 py-2 rounded-full transition">
          Todos los estilos
        </button>
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat.id}
              className="bg-[#FFFFFF] text-[#2A2F2D] hover:border-[#5A6A63] border border-[#D6DCD5] text-xs font-medium px-4 py-2 rounded-full transition"
            >
              {cat.name}
            </button>
          ))
        ) : (
          <>
            <button className="bg-[#FFFFFF] text-[#2A2F2D] hover:border-[#5A6A63] border border-[#D6DCD5] text-xs font-medium px-4 py-2 rounded-full transition">
              Streetwear
            </button>
            <button className="bg-[#FFFFFF] text-[#2A2F2D] hover:border-[#5A6A63] border border-[#D6DCD5] text-xs font-medium px-4 py-2 rounded-full transition">
              Edición Limitada
            </button>
            <button className="bg-[#FFFFFF] text-[#2A2F2D] hover:border-[#5A6A63] border border-[#D6DCD5] text-xs font-medium px-4 py-2 rounded-full transition">
              Urban Fit
            </button>
          </>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hasDbProducts
          ? products.map((product) => {
              const image = product.product_images?.sort(
                (a, b) => a.position - b.position
              )[0];
              const categoryName =
                (product.categories as unknown as { name?: string })?.name ||
                'Streetwear';

              return (
                <article
                  key={product.id}
                  className="bg-[#FFFFFF] border border-[#D6DCD5] hover:border-[#A3B0A7] rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="w-full aspect-square bg-[#F4F5F2] rounded-xl overflow-hidden mb-4 relative">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#A3B0A7]">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-[#5A6A63] font-mono uppercase tracking-wider">
                      {categoryName}
                    </span>
                    <h2 className="text-sm font-semibold text-[#2A2F2D] leading-snug group-hover:text-[#5A6A63] transition-colors truncate">
                      {product.name}
                    </h2>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D6DCD5]">
                      <span className="text-base font-bold text-[#2A2F2D]">
                        S/ {Number(product.price).toFixed(2)}
                      </span>
                      <button className="bg-[#2A2F2D] text-[#F4F5F2] hover:bg-[#5A6A63] text-xs font-medium px-3.5 py-2 rounded-xl transition">
                        Añadir
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          : fallbackProducts.map((product) => (
              <article
                key={product.id}
                className="bg-[#FFFFFF] border border-[#D6DCD5] hover:border-[#A3B0A7] rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="w-full aspect-square bg-[#F4F5F2] rounded-xl overflow-hidden mb-4 relative">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-[#FFFFFF] text-[#2A2F2D] text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-[#D6DCD5] shadow-xs">
                      {product.badge}
                    </span>
                  </div>

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#5A6A63] font-mono uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <h2 className="text-sm font-semibold text-[#2A2F2D] leading-snug group-hover:text-[#5A6A63] transition-colors truncate">
                    {product.name}
                  </h2>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D6DCD5]">
                    <div>
                      <span className="text-base font-bold text-[#2A2F2D]">
                        S/ {product.price.toFixed(2)}
                      </span>
                      {product.old_price && (
                        <span className="text-xs text-[#A3B0A7] line-through ml-1.5">
                          S/ {product.old_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="bg-[#2A2F2D] text-[#F4F5F2] hover:bg-[#5A6A63] text-xs font-medium px-3.5 py-2 rounded-xl transition">
                      Añadir
                    </button>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </main>
  );
}