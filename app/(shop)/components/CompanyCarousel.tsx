'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

type Company = {
  id: number;
  name: string;
  src: string;
  width: number;
  height: number;
  size: string;
};

export default function CompanyCarousel({ companies }: { companies: Company[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [AutoScroll({ speed: 1.0, playOnInit: true, stopOnInteraction: false })]
  );

  const extendedCompanies = [...companies, ...companies, ...companies, ...companies];

  return (
    <section id="marcas" className="w-full bg-[#F4F5F2] border-y border-[#D6DCD5] py-8 overflow-hidden select-none" aria-label="Marcas Asociadas">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
          Alianzas & Colaboraciones
        </span>
      </div>

      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex items-center">
          {extendedCompanies.map((company, index) => (
            <div 
              key={`${company.id}-${index}`} 
              className="flex-[0_0_180px] sm:flex-[0_0_220px] min-w-0 flex items-center justify-center px-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image 
                src={company.src} 
                alt={`Logotipo de ${company.name}`} 
                width={company.width} 
                height={company.height} 
                loading="lazy" 
                className={`w-auto object-contain filter grayscale contrast-125 hover:scale-105 transition-transform duration-200 ${company.size}`} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
