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
      <div className='flex flex-col w-full bg-black py-10 overflow-hidden flex items-center justify-center'>
        <div className='flex flex-col text-white'>
          <h3 className='text-5xl font-medium' style={{fontFamily: 'Staatliches'}}>NUEVOS ESTILOS</h3>
        </div>
        <div className='flex flex-row gap-8'>
          {/*Productos nuevos */}
          <div>
            
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-4"></div>
        <div className='flex flex-col text-white'>
          <h3 className='text-5xl font-medium' style={{fontFamily: 'Staatliches'}}>MAS VENDIDO</h3>
        </div>
      </div>
      <div className='flex flex-row gap-8 justify-center items-center bg-black py-10 overflow-hidden'>
        <div className='flex flex-col bg-white/80 w-[70%] rounded-4xl p-9 pt-20 pb-20'>
          <div className='flex flex-col text-center items-center justify-center'>
              <h3 className='text-6xl font-medium text-black' style={{fontFamily: 'Staatliches'}}>ELIGE TU ESTILO</h3>
          </div>
          <div className='flex flex-row gap-4 p-8 pb-3'>
            
            <a 
              href="/products/casual" 
              className='block w-[40%] h-[30vh] rounded-2xl bg-white bg-cover bg-center p-4 text-left transition-transform duration-200 ease-in-out hover:scale-110' 
              style={{backgroundImage: 'url(/ropacasual.jpg)', backgroundSize: '120%'}}
            >
              <h3 className='text-4xl font-medium text-black' style={{fontFamily: 'Lexend'}}>Casual</h3>
            </a>
            
            <a 
              href="/products/formal" 
              className='block w-[60%] h-[30vh] rounded-2xl bg-white bg-cover bg-center p-4 text-left transition-transform duration-200 ease-in-out hover:scale-110' 
              style={{backgroundImage: 'url(/ropaformal.jpg)', backgroundSize: '120%'}}
            >
              <h3 className='text-4xl font-medium text-black' style={{fontFamily: 'Lexend'}}>Formal</h3>
            </a>
          </div>
          <div className='flex flex-row gap-4 p-8 pt-1'>
          <a href="/products/fiesta" className='block w-[60%] h-[30vh] rounded-2xl bg-white bg-cover bg-center p-4 text-left transition-transform duration-200 ease-in-out hover:scale-110' 
              style={{backgroundImage: 'url(/ropafiesta.jpg)', backgroundSize: '120%'}}
            >
              <h3 className='text-4xl font-medium text-black' style={{fontFamily: 'Lexend'}}>Fiesta</h3>
            </a>
            <a href="/products/gym" className='block w-[40%] h-[30vh] rounded-2xl bg-white bg-cover bg-center p-4 text-left transition-transform duration-200 ease-in-out hover:scale-110' 
              style={{backgroundImage: 'url(/ropagym.jpg)', backgroundSize: '120%'}}
            >
              <h3 className='text-4xl font-medium text-black' style={{fontFamily: 'Lexend'}}>Gym</h3>
            </a>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between p-15 bg-black'>
        <div className=''>
          <h2 className='text-6xl font-medium text-white' style={{fontFamily: 'Staatliches'}}>NUESTROS CLIENTES SATISFECHOS</h2>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <button aria-label="Anterior" className="p-2 hover:scale-160 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button aria-label="Siguiente" className="p-2 hover:scale-160 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
      <div className='w-full h-80 flex flex-col bg-gradient-to-b from-black from-50% to-gray-200 to-50% items-center justify-center'>
        <div className="flex flex-col w-[70%] bg-[#2b2b2b] md:flex-row items-center justify-between text-white p-8 md:p-12 rounded-3xl mx-auto gap-8">
          {/* Bloque 1: Texto de la izquierda */}
          <div className="w-[60%]">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight">
              Mantente al día de nuestras últimas ofertas
            </h2>
          </div >

          {/* Bloque 2: Formulario de la derecha (Contiene el input y el botón) */}
          <div className="flex flex-col gap-4 w-full md:w-[350px]">
            {/* Input de correo */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                {/* Icono de carta simple */}
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <input 
                type="email" 
                placeholder="Ingresa tu correo" 
                className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none placeholder-gray-400"
              />
              </div>
          
                {/* Botón de suscripción */}
                <button className="w-full bg-white text-black font-semibold py-3 rounded-full text-sm hover:bg-gray-100 transition-colors">
                  Suscribete a nuestro newsletter
                </button>
              </div>
        </div>
      </div>
    </main>
  );
}