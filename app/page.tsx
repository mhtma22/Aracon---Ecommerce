'use client'; // Necesario en Next.js porque usa hooks (useState, useEffect)

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const companies = [
  { id: 1, name: "Versace", src: "/versace.svg", size: "h-8" },
  { id: 2, name: "Calvin Klein", src: "/calvinklein.svg" , size: "h-8"},
  { id: 3, name: "Prada", src: "/prada.svg", size: "h-7" },
  { id: 4, name: "Zara", src: "/zara.svg", size: "h-8" },
  { id: 5, name: "Gucci", src: "/gucci.svg", size: "h-8" },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [
      AutoScroll({
        speed: 1.1,
        playOnInit: true,
        stopOnInteraction: false
      })
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoScroll?.play();
  }, [emblaApi]);

  // Duplicamos el array varias veces para garantizar que desborde y ruede fluidamente
  const extendedCompanies = [...companies, ...companies, ...companies];

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
    
      <div className="w-full bg-black py-10 overflow-hidden" ref={emblaRef}>
        <div className="flex items-center">
          {extendedCompanies.map((company, index) => (
            <div 
              key={`${company.id}-${index}`} 
              className="flex-[0_0_240px] min-w-0 flex items-center justify-center px-6 select-none"
            >
              <img
                src={company.src}
                alt={company.name}
                width={120}
                height={40}
                className={`w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity ${company.size}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full bg-black py-10 overflow-hidden flex items-center justify-center'>
        <div className='flex flex-col text-white'>
          <h3 className='text-5xl font-medium' style={{fontFamily: 'Staatliches'}}>NUEVOS ESTILOS</h3>
        </div>
        
      </div>
    </main>
  );
}