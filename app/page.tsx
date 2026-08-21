'use client'
import useEmblaCarousel from 'embla-carousel-react'

const companies = [
  { id: 1, name: "Versace", src: "/versace.svg", size: "h-8" },
  { id: 2, name: "Calvin Klein", src: "/calvinklein.svg" , size: "h-8"},
  { id: 3, name: "Prada", src: "/prada.svg", size: "h-7" },
  { id: 4, name: "Zara", src: "/zara.svg", size: "h-8" },
  { id: 5, name: "Gucci", src: "/gucci.svg", size: "h-8" },
];


export default function Home() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-130 w-full" style={{background: 'linear-gradient(to right, #a72e23 70%, #a22a21 100%)'}}> 
        <div className='flex flex-row items-center justify-center gap-9'>
          <div className='flex flex-col gap-14'>
            <div className='flex flex-col gap-6'>
              <div>
                <h2 className="text-7xl font-medium mr-20" style={{fontFamily: 'Staatliches'}}>ENCUENTRA ROPA A TU <br />MEDIDA DE ESTILO</h2>
                <p className="text-[#A6A6A6] text-sm" style={{fontFamily: 'Lexend'}}>Explore nuestra variada selección de prendas confeccionadas meticulosamente,<br /> diseñadas para resaltar su individualidad y satisfacer su estilo personal.</p>
              </div>
              <div>
                <a className="bg-black text-white font-medium rounded-20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-200" style={{fontFamily: 'Staatliches'}} href="/products">Compra ahora</a>
              </div>
            </div>
            <div className='flex flex-row gap-8'>
              <div className='flex flex-col'>
                <h3 className="text-4xl font-medium" style={{fontFamily: 'Staatliches'}}>200+</h3>
                <p className="text-[#A6A6A6] text-sm" style={{fontFamily: 'Lexend'}}>Tiendas Internacionales</p>
              </div>
              <div className='flex flex-col'>
                <h3 className="text-4xl font-medium" style={{fontFamily: 'Staatliches'}}>2,000+</h3>
                <p className="text-[#A6A6A6] text-sm" style={{fontFamily: 'Lexend'}}>Productos de alta calidad</p>
              </div>
              <div className='flex flex-col'>
                <h3 className="text-4xl font-medium" style={{fontFamily: 'Staatliches'}}>30,000+</h3>
                <p className="text-[#A6A6A6] text-sm" style={{fontFamily: 'Lexend'}}>Clientes Satisfechos</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/fotomodelo3.jpg" alt="" className='h-130 object-cover'/>
          </div>
        </div>
      </div>
      <div className="w-full bg-black py-10 overflow-hidden">
        {/* Contenedor del carrusel con degradados oscuros en los bordes */}
        <div className="relative flex overflow-x-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-black after:to-transparent">
          
          {/* Pista con la animación */}
          <div className="flex marquee-track whitespace-nowrap gap-16 items-center">
            {[...companies, ...companies].map((company, index) => (
              <a
                key={index}
                href="#inline-flex items-center mr-0"
                
              >
                <img 
                  src={company.src} 
                  alt={company.name} 
            
                  className={`block w-auto object-contain transition-all duration-300
                    brightness-0 invert opacity-70 hover:opacity-100 
                    ${company.size}
                  `}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex bg-white/30">
          <div className="flex-[0_0_100%]">
            <img src="/banner1.jpg" alt="banner" className="w-full h-[400px] object-cover" />
          </div>
          <div className="flex-[0_0_100%]">
            <img src="/banner2.jpg" alt="banner" className="w-full h-[400px] object-cover" />
          </div>
          <div className="flex-[0_0_100%]">
            <img src="/banner3.jpg" alt="banner" className="w-full h-[400px] object-cover" />
          </div>
        </div>  
      </div>
    </main>
  );
}