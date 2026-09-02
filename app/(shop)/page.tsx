'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const companies = [
  { id: 1, name: "Versace", src: "/versace.svg", width: 120, height: 32, size: "h-8" },
  { id: 2, name: "Calvin Klein", src: "/calvinklein.svg", width: 120, height: 32, size: "h-8" },
  { id: 3, name: "Prada", src: "/prada.svg", width: 120, height: 28, size: "h-7" },
  { id: 4, name: "Zara", src: "/zara.svg", width: 120, height: 32, size: "h-8" },
  { id: 5, name: "Gucci", src: "/gucci.svg", width: 120, height: 32, size: "h-8" },
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
    image: "/ropacasual.jpg",
    badge: "NEW DROP"
  },
  {
    id: 2,
    name: "Casaca Varsity Vintage 2026",
    category: "Edición Limitada",
    price: "S/ 289.00",
    originalPrice: "S/ 349.00",
    discount: "-17%",
    rating: "5.0",
    reviews: "94",
    image: "/ropaformal.jpg",
    badge: "BESTSELLER"
  },
  {
    id: 3,
    name: "Pantalón Cargo Cyber Neon",
    category: "Urban Fit",
    price: "S/ 179.00",
    originalPrice: "S/ 229.00",
    discount: "-20%",
    rating: "4.8",
    reviews: "76",
    image: "/ropagym.jpg",
    badge: "HOT"
  },
  {
    id: 4,
    name: "Hoodie Graphic High-Fashion",
    category: "Streetwear",
    price: "S/ 169.00",
    originalPrice: "S/ 219.00",
    discount: "-22%",
    rating: "4.9",
    reviews: "210",
    image: "/ropafiesta.jpg",
    badge: "TRENDING"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Mateo R.",
    role: "Cliente Verificado",
    comment: "«La calidad del algodón y el fit oversize son insuperables. Llegó al día siguiente a Lima. ¡Recomendadísimo!»",
    rating: 5,
    tag: "Casual Fit"
  },
  {
    id: 2,
    name: "Camila V.",
    role: "Cliente Verificado",
    comment: "«El diseño maximalista de la ropa es único en Perú. La casaca varsity se ve increíble en persona.»",
    rating: 5,
    tag: "Varsity Collection"
  },
  {
    id: 3,
    name: "Diego S.",
    role: "Cliente Verificado",
    comment: "«Compré para una fiesta el fin de semana y me salvó. La atención al cliente por WhatsApp fue super rápida.»",
    rating: 5,
    tag: "Party Wear"
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [
      AutoScroll({
        speed: 1.2,
        playOnInit: true,
        stopOnInteraction: false
      })
    ]
  );

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoScroll?.play();
  }, [emblaApi]);

  const extendedCompanies = [...companies, ...companies, ...companies, ...companies];

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="flex-1 bg-[#09090b] text-white overflow-hidden">
      
      {/* HERO SECTION MAXIMALISTA */}
      <section className="relative w-full bg-gradient-to-br from-[#120508] via-[#09090b] to-[#1a002c] border-b-4 border-[#ccff00] pt-8 pb-16 px-4 sm:px-8 lg:px-12" aria-label="Sección Principal">
        {/* Background Decorative Layer Shapes */}
        <div className="absolute top-10 left-5 w-72 h-72 bg-[#ff0055]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div className="absolute bottom-5 right-10 w-96 h-96 bg-[#00e5ff]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-8 z-10">
            
            {/* Top Floating Badges */}
            <div className="flex items-center gap-3">
              <span className="bg-[#ccff00] text-black font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#ff0055] transform -rotate-2">
                ⚡ EDICIÓN URBANA 2026
              </span>
              <span className="bg-[#ff0055] text-white font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] transform rotate-2 animate-pulse">
                🔥 30% OFF EN DROPS
              </span>
            </div>

            {/* Giant Maximalist Title */}
            <div>
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-white"
                style={{ fontFamily: 'Staatliches, sans-serif' }}
              >
                ENCUENTRA ROPA A TU <br />
                <span className="text-[#ccff00] relative inline-block">
                  MEDIDA DE ESTILO
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#ff0055] -z-10 transform -rotate-1" aria-hidden="true"></span>
                </span>
              </h1>
              
              <p 
                className="mt-6 text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed"
                style={{ fontFamily: 'Lexend, sans-serif' }}
              >
                Explore nuestra variada selección de prendas confeccionadas meticulosamente, diseñadas para resaltar su individualidad y satisfacer su estilo personal.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="/products" 
                className="inline-flex items-center gap-3 bg-[#ccff00] text-black font-black text-xl px-8 py-4 rounded-xl border-3 border-black shadow-[6px_6px_0px_#ff0055] hover:bg-[#ff0055] hover:text-white hover:shadow-[6px_6px_0px_#ccff00] hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none transition-all uppercase tracking-wider"
                style={{ fontFamily: 'Staatliches, sans-serif' }}
              >
                COMPRA AHORA ➔
              </a>
              
              <a 
                href="#estilos" 
                className="inline-flex items-center gap-2 bg-transparent text-white font-bold text-lg px-6 py-4 rounded-xl border-2 border-white/40 hover:border-[#00e5ff] hover:text-[#00e5ff] focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:outline-none transition-all"
                style={{ fontFamily: 'Lexend, sans-serif' }}
              >
                Ver Colecciones
              </a>
            </div>

            {/* Stats Cards (Neo-brutalist style) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-gray-800">
              <div className="bg-[#121214] p-3 sm:p-4 rounded-xl border-2 border-[#ccff00] shadow-[4px_4px_0px_#000]">
                <p className="text-2xl sm:text-3xl font-black text-[#ccff00]" style={{ fontFamily: 'Staatliches, sans-serif' }}>200+</p>
                <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: 'Lexend, sans-serif' }}>Tiendas Int.</p>
              </div>

              <div className="bg-[#121214] p-3 sm:p-4 rounded-xl border-2 border-[#ff0055] shadow-[4px_4px_0px_#000]">
                <p className="text-2xl sm:text-3xl font-black text-[#ff0055]" style={{ fontFamily: 'Staatliches, sans-serif' }}>2,000+</p>
                <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: 'Lexend, sans-serif' }}>Productos Alta Calidad</p>
              </div>

              <div className="bg-[#121214] p-3 sm:p-4 rounded-xl border-2 border-[#00e5ff] shadow-[4px_4px_0px_#000]">
                <p className="text-2xl sm:text-3xl font-black text-[#00e5ff]" style={{ fontFamily: 'Staatliches, sans-serif' }}>30,000+</p>
                <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: 'Lexend, sans-serif' }}>Clientes Satisfechos</p>
              </div>
            </div>

          </div>

          {/* Right Image Feature Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            {/* Sticker Badge Overlay Left */}
            <div className="absolute -top-4 -left-4 z-20 bg-[#ff0055] text-white font-black text-xs px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] transform -rotate-6">
              ✦ 100% STREETWEAR ✦
            </div>

            {/* Sticker Badge Overlay Right */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-[#ccff00] text-black font-black text-xs px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] transform rotate-6">
              LIMA • PERÚ 2026
            </div>

            {/* Main Model Frame with Eager LCP Loading */}
            <div className="relative rounded-3xl border-4 border-[#ccff00] bg-gradient-to-b from-[#ff0055] to-purple-900 p-2 shadow-[12px_12px_0px_#ff0055] group overflow-hidden max-w-md w-full">
              <img 
                src="/fotomodelo3.jpg" 
                alt="Modelo luciendo prenda Aracon Streetwear" 
                width={440}
                height={480}
                loading="eager"
                decoding="async"
                className="w-full h-[480px] object-cover rounded-2xl filter group-hover:contrast-110 transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" aria-hidden="true"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/90 p-3 rounded-xl border border-white/20 backdrop-blur-md">
                <span className="text-[#00e5ff] text-xs font-mono font-bold uppercase">PRENDA RECOMENDADA</span>
                <p className="text-white text-sm font-bold truncate">Casaca Streetwear Acid Black Edition</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* MARCAS PARNERS CAROUSEL */}
      <section className="w-full bg-[#ccff00] py-6 border-b-4 border-black overflow-hidden select-none" aria-label="Marcas Aliadas">
        <div className="flex items-center gap-4 mb-2 justify-center">
          <span className="bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest font-mono">
            NUESTRAS MARCAS ALIADAS
          </span>
        </div>
        
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex items-center">
            {extendedCompanies.map((company, index) => (
              <div 
                key={`${company.id}-${index}`} 
                className="flex-[0_0_200px] sm:flex-[0_0_240px] min-w-0 flex items-center justify-center px-6"
              >
                <img
                  src={company.src}
                  alt={`Logotipo de ${company.name}`}
                  width={company.width}
                  height={company.height}
                  loading="lazy"
                  decoding="async"
                  className={`w-auto object-contain filter brightness-0 hover:scale-125 transition-transform duration-200 ${company.size}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECCIÓN NUEVOS ESTILOS Y MÁS VENDIDOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="nuevos-estilos-heading">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b-2 border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ff0055]" aria-hidden="true"></span>
              <span className="text-[#ff0055] font-black text-xs uppercase tracking-widest font-mono">FRESH DROP</span>
            </div>
            <h2 id="nuevos-estilos-heading" className="text-4xl sm:text-5xl font-extrabold uppercase text-white" style={{ fontFamily: 'Staatliches, sans-serif' }}>
              NUEVOS ESTILOS <span className="text-[#ccff00]">URBANOS</span>
            </h2>
          </div>
          
          <a href="/products" className="bg-[#121214] text-[#ccff00] border-2 border-[#ccff00] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#ccff00] hover:text-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all shadow-[3px_3px_0px_#000]">
            Ver todo el catálogo ➔
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <article 
              key={product.id}
              className="bg-[#121214] border-2 border-gray-800 hover:border-[#ccff00] rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 shadow-[6px_6px_0px_#000] hover:-translate-y-1 relative"
            >
              {/* Product Badges */}
              <span className="absolute top-6 left-6 z-10 bg-[#ff0055] text-white font-black text-[10px] px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_#000]">
                {product.badge}
              </span>

              <span className="absolute top-6 right-6 z-10 bg-[#ccff00] text-black font-black text-[10px] px-2 py-0.5 rounded border border-black">
                {product.discount}
              </span>

              {/* Image Frame */}
              <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  width={300}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Meta */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[#00e5ff] font-mono font-bold uppercase">{product.category}</span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#ccff00] transition-colors">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold" aria-label={`Calificación ${product.rating} de 5 estrellas`}>
                  <span aria-hidden="true">★ {product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Price & Buy Button */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[#ccff00]" style={{ fontFamily: 'Staatliches, sans-serif' }}>{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                  </div>

                  <button className="bg-[#ccff00] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl border border-black shadow-[2px_2px_0px_#ff0055] hover:bg-[#ff0055] hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all uppercase">
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>


      {/* BENTO GRID: ELIGE TU ESTILO */}
      <section id="estilos" className="w-full bg-[#000000] py-16 border-y-4 border-[#ff0055]" aria-labelledby="elige-estilo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-[#ff0055] text-white text-xs font-black px-3 py-1 uppercase tracking-widest font-mono">
              CATEGORÍAS DE TENDENCIA
            </span>
            <h2 
              id="elige-estilo-heading"
              className="text-5xl sm:text-6xl font-black text-white uppercase mt-3"
              style={{ fontFamily: 'Staatliches, sans-serif' }}
            >
              ELIGE TU <span className="text-[#ccff00]">ESTILO</span>
            </h2>
            <p className="text-gray-300 text-sm mt-2">Encuentra la combinación perfecta según tu ocasión del día.</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Casual - 5 cols */}
            <a 
              href="/products" 
              className="md:col-span-5 relative h-[320px] rounded-3xl overflow-hidden border-3 border-[#ccff00] group shadow-[8px_8px_0px_#ff0055] transition-all hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
            >
              <img 
                src="/ropacasual.jpg" 
                alt="Colección de ropa Casual" 
                width={500}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true"></div>
              
              <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                <span className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 w-max uppercase tracking-wider">
                  DROP 01
                </span>
                <h3 className="text-4xl font-black text-white uppercase" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  Casual
                </h3>
                <span className="text-xs text-gray-300 font-semibold group-hover:text-[#ccff00]">Explorar 120+ prendas ➔</span>
              </div>
            </a>

            {/* Formal - 7 cols */}
            <a 
              href="/products" 
              className="md:col-span-7 relative h-[320px] rounded-3xl overflow-hidden border-3 border-[#00e5ff] group shadow-[8px_8px_0px_#000] transition-all hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
            >
              <img 
                src="/ropaformal.jpg" 
                alt="Colección de ropa Formal" 
                width={700}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true"></div>
              
              <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                <span className="bg-[#00e5ff] text-black text-[10px] font-black px-2 py-0.5 w-max uppercase tracking-wider">
                  ELEGANT STREET
                </span>
                <h3 className="text-4xl font-black text-white uppercase" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  Formal
                </h3>
                <span className="text-xs text-gray-300 font-semibold group-hover:text-[#00e5ff]">Explorar 85+ prendas ➔</span>
              </div>
            </a>

            {/* Fiesta - 7 cols */}
            <a 
              href="/products" 
              className="md:col-span-7 relative h-[320px] rounded-3xl overflow-hidden border-3 border-[#ff0055] group shadow-[8px_8px_0px_#ccff00] transition-all hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
            >
              <img 
                src="/ropafiesta.jpg" 
                alt="Colección de ropa para Fiesta" 
                width={700}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true"></div>
              
              <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                <span className="bg-[#ff0055] text-white text-[10px] font-black px-2 py-0.5 w-max uppercase tracking-wider">
                  NIGHTOUT
                </span>
                <h3 className="text-4xl font-black text-white uppercase" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  Fiesta
                </h3>
                <span className="text-xs text-gray-300 font-semibold group-hover:text-[#ff0055]">Explorar 95+ prendas ➔</span>
              </div>
            </a>

            {/* Gym - 5 cols */}
            <a 
              href="/products" 
              className="md:col-span-5 relative h-[320px] rounded-3xl overflow-hidden border-3 border-[#ccff00] group shadow-[8px_8px_0px_#00e5ff] transition-all hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
            >
              <img 
                src="/ropagym.jpg" 
                alt="Colección de ropa Gym Activewear" 
                width={500}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true"></div>
              
              <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                <span className="bg-white text-black text-[10px] font-black px-2 py-0.5 w-max uppercase tracking-wider">
                  ACTIVEWEAR
                </span>
                <h3 className="text-4xl font-black text-white uppercase" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                  Gym
                </h3>
                <span className="text-xs text-gray-300 font-semibold group-hover:text-[#ccff00]">Explorar 60+ prendas ➔</span>
              </div>
            </a>

          </div>

        </div>
      </section>


      {/* TESTIMONIOS CLIENTES SATISFECHOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="testimonios-heading">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="bg-[#00e5ff] text-black font-black text-xs px-3 py-1 uppercase tracking-widest font-mono">
              COMUNIDAD ARACON
            </span>
            <h2 id="testimonios-heading" className="text-4xl sm:text-5xl font-black text-white uppercase mt-2" style={{ fontFamily: 'Staatliches, sans-serif' }}>
              NUESTROS CLIENTES <span className="text-[#ff0055]">SATISFECHOS</span>
            </h2>
          </div>

          {/* Navigation Control Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrevTestimonial}
              aria-label="Ver testimonio anterior" 
              className="bg-[#121214] text-white p-3 rounded-full border-2 border-gray-700 hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all shadow-[3px_3px_0px_#000]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={handleNextTestimonial}
              aria-label="Ver testimonio siguiente" 
              className="bg-[#121214] text-white p-3 rounded-full border-2 border-gray-700 hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all shadow-[3px_3px_0px_#000]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const isActive = idx === activeTestimonialIndex;
            return (
              <blockquote 
                key={item.id}
                className={`bg-[#121214] p-6 rounded-3xl border-3 ${isActive ? 'border-[#ccff00] shadow-[8px_8px_0px_#ff0055]' : 'border-gray-800 shadow-[6px_6px_0px_#000]'} transition-all flex flex-col justify-between gap-6 relative m-0`}
              >
                <span className="bg-[#ccff00]/10 text-[#ccff00] text-xs font-mono font-bold px-3 py-1 rounded-full w-max border border-[#ccff00]/30">
                  {item.tag}
                </span>

                <p 
                  className="text-gray-200 text-lg leading-relaxed italic"
                  style={{ fontFamily: 'Caveat, cursive', fontSize: '22px' }}
                >
                  {item.comment}
                </p>

                <footer className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <div className="flex flex-col">
                    <cite className="text-white font-bold text-base not-italic">{item.name}</cite>
                    <span className="text-xs text-[#00e5ff] font-semibold">{item.role}</span>
                  </div>

                  <div className="text-yellow-400 text-sm" aria-label={`Calificación: ${item.rating} de 5 estrellas`}>
                    {"★".repeat(item.rating)}
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>

      </section>


      {/* NEWSLETTER BANNER MAXIMALISTA */}
      <section className="w-full py-12 px-4 sm:px-8" aria-labelledby="newsletter-heading">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#ff0055] via-[#7000ff] to-[#00e5ff] p-2 rounded-3xl border-4 border-black shadow-[12px_12px_0px_#ccff00]">
          
          <div className="bg-[#09090b] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Text Left */}
            <div className="lg:w-1/2 flex flex-col gap-3 text-center lg:text-left">
              <span className="bg-[#ccff00] text-black font-black text-xs px-3 py-1 rounded w-max mx-auto lg:mx-0 uppercase font-mono border border-black">
                ÚNETE AL CLUB ARACON
              </span>
              
              <h2 id="newsletter-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Staatliches, sans-serif' }}>
                MANTENTE AL DÍA DE NUESTRAS ÚLTIMAS <span className="text-[#ccff00]">OFERTAS EXCLUSIVAS</span>
              </h2>

              <p className="text-gray-300 text-sm">
                Recibe noticias sobre nuevos drops, descuentos secretos y ofertas relámpago antes que nadie.
              </p>
            </div>

            {/* Form Right */}
            <form className="lg:w-1/2 w-full flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full">
                <label htmlFor="newsletter-email" className="sr-only">Ingresa tu correo electrónico</label>
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input 
                  id="newsletter-email"
                  type="email" 
                  required
                  placeholder="Ingresa tu correo electrónico aquí..." 
                  className="w-full bg-white text-black font-bold pl-12 pr-4 py-4 rounded-xl border-2 border-black text-sm focus:outline-none focus:ring-4 focus:ring-[#ccff00] shadow-[4px_4px_0px_#000]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#ccff00] text-black font-black text-lg py-4 rounded-xl border-2 border-black hover:bg-[#ff0055] hover:text-white focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none transition-all uppercase tracking-wider shadow-[4px_4px_0px_#000]" 
                style={{ fontFamily: 'Staatliches, sans-serif' }}
              >
                SUSCRÍBETE AHORA 🚀
              </button>
            </form>

          </div>

        </div>
      </section>

    </main>
  );
}