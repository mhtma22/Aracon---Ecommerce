import Image from 'next/image';
import Link from 'next/link';
import CompanyCarousel from './components/CompanyCarousel';
import StyleCard from './components/StyleCard';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

const companies = [
  { id: 1, name: "Versace", src: "/versace.svg", width: 120, height: 32, size: "h-7" },
  { id: 2, name: "Calvin Klein", src: "/calvinklein.svg", width: 120, height: 32, size: "h-7" },
  { id: 3, name: "Prada", src: "/prada.svg", width: 120, height: 28, size: "h-6" },
  { id: 4, name: "Zara", src: "/zara.svg", width: 120, height: 32, size: "h-7" },
  { id: 5, name: "Gucci", src: "/gucci.svg", width: 120, height: 32, size: "h-7" },
];

const newArrivals = [
  {
    id: 1,
    name: "Polera Oversize Acid Wash",
    category: "Streetwear",
    price: "S/ 149.00",
    originalPrice: "S/ 199.00",
    discount: "-25%",
    rating: "4.9",
    reviews: "128",
    image: "/ropacasual.webp",
    badge: "Nuevo"
  },
  {
    id: 2,
    name: "Casaca Varsity Clásica",
    category: "Edición Limitada",
    price: "S/ 289.00",
    originalPrice: "S/ 349.00",
    discount: "-17%",
    rating: "5.0",
    reviews: "94",
    image: "/ropaformal.webp",
    badge: "Destacado"
  },
  {
    id: 3,
    name: "Pantalón Cargo Táctico Fit",
    category: "Urban Fit",
    price: "S/ 179.00",
    originalPrice: "S/ 229.00",
    discount: "-20%",
    rating: "4.8",
    reviews: "76",
    image: "/ropagym.avif",
    badge: "Popular"
  },
  {
    id: 4,
    name: "Hoodie Minimalista Algodón Pima",
    category: "Streetwear",
    price: "S/ 169.00",
    originalPrice: "S/ 219.00",
    discount: "-22%",
    rating: "4.9",
    reviews: "210",
    image: "/ropafiesta.webp",
    badge: "Tendencia"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Mateo R.",
    role: "Cliente Verificado",
    comment: "«La calidad del algodón y el fit oversize son insuperables. Llegó al día siguiente a Lima con una presentación impecable. Muy recomendado.»",
    rating: 5,
    tag: "Casual Fit"
  },
  {
    id: 2,
    name: "Camila V.",
    role: "Cliente Verificado",
    comment: "«El corte minimalista y la caída de la casaca son excepcionales. Se percibe de inmediato el estándar superior de confección y acabados.»",
    rating: 5,
    tag: "Varsity Collection"
  },
  {
    id: 3,
    name: "Diego S.",
    role: "Cliente Verificado",
    comment: "«Excelente experiencia de compra. La tabla de tallas es exacta y la atención para resolver dudas fue sumamente ágil y amable.»",
    rating: 5,
    tag: "Activewear"
  }
];

export default function Home() {
  return (
    <main className="flex-1 bg-[#F4F5F2] text-[#2A2F2D] overflow-hidden">
      
      {/* HERO SECTION MINIMALISTA */}
      <section className="relative w-full pt-12 pb-20 px-4 sm:px-8 lg:px-12 border-b border-[#D6DCD5]" aria-label="Sección Principal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Top Minimalist Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-[#5A6A63] bg-[#FFFFFF] border border-[#D6DCD5] shadow-xs">
                <Sparkles className="w-3 h-3 text-[#5A6A63]" />
                COLECCIÓN 2026 &bull; DROP URBANO
              </span>
            </div>

            {/* Main Title */}
            <div>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] text-[#2A2F2D]"
                style={{ fontFamily: 'Lexend, sans-serif' }}
              >
                Prendas esenciales confeccionadas con carácter contemporáneo.
              </h1>
              
              <p className="mt-6 text-[#5A6A63] text-base sm:text-lg max-w-xl leading-relaxed">
                Descubre siluetas limpias, materiales duraderos y acabados artesanales concebidos para acompañar tu estilo de vida cotidiano.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2.5 bg-[#2A2F2D] text-[#F4F5F2] hover:bg-[#5A6A63] font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[#2A2F2D] focus-visible:outline-none"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a 
                href="#estilos" 
                className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#2A2F2D] border border-[#D6DCD5] hover:bg-[#D6DCD5]/30 font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none shadow-xs"
              >
                Ver Estilos
              </a>
            </div>

            {/* Subtle Editorial Attributes */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#D6DCD5] max-w-lg">
              <div>
                <p className="text-2xl font-bold tracking-tight text-[#2A2F2D]">100%</p>
                <p className="text-xs text-[#5A6A63] mt-0.5">Algodón Peruano</p>
              </div>

              <div className="border-l border-[#D6DCD5] pl-6">
                <p className="text-2xl font-bold tracking-tight text-[#2A2F2D]">24-48h</p>
                <p className="text-xs text-[#5A6A63] mt-0.5">Envíos a Nivel Nacional</p>
              </div>

              <div className="border-l border-[#D6DCD5] pl-6">
                <p className="text-2xl font-bold tracking-tight text-[#2A2F2D]">4.9 / 5</p>
                <p className="text-xs text-[#5A6A63] mt-0.5">Satisfacción Verificada</p>
              </div>
            </div>

          </div>

          {/* Right Image Feature Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative rounded-3xl border border-[#D6DCD5] bg-[#FFFFFF] p-3 shadow-md overflow-hidden max-w-md w-full group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F4F5F2]">
                <Image
                  src="/fotomodelo3.webp" 
                  alt="Modelo vistiendo prenda minimalista de la colección Aracon" 
                  width={460}
                  height={575}
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                
                {/* Subtle bottom caption card */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#D6DCD5]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6A63] block">
                      Prenda Destacada
                    </span>
                    <p className="text-xs font-semibold text-[#2A2F2D] truncate">
                      Casaca Acid Black Edición Limitada
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#2A2F2D] bg-[#F4F5F2] px-2 py-1 rounded-md border border-[#D6DCD5]">
                    S/ 289
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COMPAÑÍAS ALIADAS */}
      <CompanyCarousel companies={companies} />

      {/* SECCIÓN NUEVOS INGRESOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="nuevos-estilos-heading">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#D6DCD5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
              Lanzamientos Recientes
            </span>
            <h2 
              id="nuevos-estilos-heading" 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A2F2D] mt-1" 
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              Nuevos Diseños
            </h2>
          </div>
          
          <Link 
            href="/products" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A6A63] hover:text-[#2A2F2D] transition group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <article 
              key={product.id}
              className="bg-[#FFFFFF] border border-[#D6DCD5] hover:border-[#A3B0A7] rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Image Frame */}
              <div className="w-full aspect-square bg-[#F4F5F2] rounded-xl overflow-hidden mb-4 relative">
                {/* Product Badges */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-[#FFFFFF] text-[#2A2F2D] text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-[#D6DCD5] shadow-xs">
                    {product.badge}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="bg-[#D6DCD5] text-[#2A2F2D] text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md">
                    {product.discount}
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

              {/* Product Meta */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#5A6A63] font-mono uppercase tracking-wider">
                  {product.category}
                </span>

                <h3 className="text-sm font-semibold text-[#2A2F2D] leading-snug group-hover:text-[#5A6A63] transition-colors truncate">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#5A6A63] text-xs font-medium" aria-label={`Calificación ${product.rating} de 5 estrellas`}>
                  <span>★ {product.rating}</span>
                  <span className="text-[#A3B0A7]">({product.reviews})</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D6DCD5]">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#2A2F2D]">
                      {product.price}
                    </span>
                    <span className="text-xs text-[#A3B0A7] line-through">
                      {product.originalPrice}
                    </span>
                  </div>

                  <button className="bg-[#2A2F2D] text-[#F4F5F2] hover:bg-[#5A6A63] text-xs font-medium px-3.5 py-2 rounded-xl transition focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none">
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* BENTO GRID: ESTILOS Y OCASIONES */}
      <section id="estilos" className="w-full bg-[#FFFFFF] py-20 border-y border-[#D6DCD5]" aria-labelledby="elige-estilo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
              Categorías Principales
            </span>
            <h2 
              id="elige-estilo-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A2F2D] mt-1"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              Explora por Ocasión
            </h2>
            <p className="text-[#5A6A63] text-sm mt-2">
              Líneas de diseño pensadas para cada momento del día con cortes versátiles y atemporales.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Casual - 5 cols */}
            <StyleCard className="md:col-span-5" image="/ropacasual.webp" imageAlt="Colección de ropa Casual" width={500} sizes="(max-width: 768px) 100vw, 42vw" label="Drop 01" title="Casual" description="Ver 120+ prendas" />

            {/* Formal - 7 cols */}
            <StyleCard className="md:col-span-7" image="/ropaformal.webp" imageAlt="Colección de ropa Formal" width={700} sizes="(max-width: 768px) 100vw, 58vw" label="Tailored Fit" title="Formal Contemporáneo" description="Ver 85+ prendas" />

            {/* Fiesta - 7 cols */}
            <StyleCard className="md:col-span-7" image="/ropafiesta.webp" imageAlt="Colección de ropa para Noche y Eventos" width={700} sizes="(max-width: 768px) 100vw, 58vw" label="Nightwear" title="Noche & Eventos" description="Ver 95+ prendas" />

            {/* Gym - 5 cols */}
            <StyleCard className="md:col-span-5" image="/ropagym.webp" imageAlt="Colección de ropa Activewear" width={500} sizes="(max-width: 768px) 100vw, 42vw" label="Active" title="Activewear" description="Ver 60+ prendas" />

          </div>

        </div>
      </section>

      {/* TESTIMONIOS */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* NEWSLETTER BANNER MINIMALISTA */}
      <section className="w-full py-16 px-4 sm:px-8 border-t border-[#D6DCD5]" aria-labelledby="newsletter-heading">
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-3xl border border-[#D6DCD5] p-8 sm:p-12 shadow-sm text-center flex flex-col items-center gap-6">
          
          <div className="max-w-lg flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
              Club Aracon
            </span>
            <h2 
              id="newsletter-heading" 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2A2F2D]"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              Recibe Novedades y Acceso Anticipado
            </h2>
            <p className="text-sm text-[#5A6A63] leading-relaxed">
              Sé el primero en conocer nuestros lanzamientos de edición limitada, reposiciones de inventario y promociones privadas.
            </p>
          </div>

          <form 
            action="#" 
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
            <input 
              id="newsletter-email"
              type="email" 
              required
              placeholder="Ingresa tu correo electrónico..." 
              className="flex-1 bg-[#F4F5F2] text-[#2A2F2D] placeholder-[#A3B0A7] text-sm px-4 py-3 rounded-full border border-[#D6DCD5] focus:outline-none focus:border-[#5A6A63] focus:ring-1 focus:ring-[#5A6A63] transition"
            />
            <button 
              type="submit" 
              className="bg-[#2A2F2D] text-[#F4F5F2] hover:bg-[#5A6A63] font-medium text-xs sm:text-sm px-6 py-3 rounded-full transition focus-visible:ring-2 focus-visible:ring-[#2A2F2D] focus-visible:outline-none shadow-xs whitespace-nowrap"
            >
              Suscribirse
            </button>
          </form>

          <p className="text-[11px] text-[#A3B0A7]">
            Respetamos tu privacidad. Puedes cancelar tu suscripción en cualquier momento.
          </p>

        </div>
      </section>

    </main>
  );
}
