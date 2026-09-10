'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  tag: string;
};

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const move = (direction: 1 | -1) => {
    setActiveTestimonialIndex((prev) => (prev + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="testimonios-heading">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#D6DCD5]">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#5A6A63]">
            Comunidad Aracon
          </span>
          <h2 
            id="testimonios-heading" 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A2F2D] mt-2" 
            style={{ fontFamily: 'Lexend, sans-serif' }}
          >
            Opiniones de Clientes
          </h2>
          <p className="text-sm text-[#5A6A63] mt-1">
            Reseñas verificadas sobre la calidad textil, corte y experiencia de compra.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => move(-1)} 
            aria-label="Ver testimonio anterior" 
            className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#D6DCD5] text-[#2A2F2D] hover:bg-[#D6DCD5]/50 flex items-center justify-center transition focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => move(1)} 
            aria-label="Ver testimonio siguiente" 
            className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#D6DCD5] text-[#2A2F2D] hover:bg-[#D6DCD5]/50 flex items-center justify-center transition focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => {
          const isActive = idx === activeTestimonialIndex;

          return (
            <blockquote 
              key={item.id} 
              className={`bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-6 relative m-0 ${
                isActive 
                  ? 'border-[#5A6A63] shadow-md ring-1 ring-[#5A6A63]/20' 
                  : 'border-[#D6DCD5] hover:border-[#A3B0A7]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="bg-[#F4F5F2] text-[#5A6A63] text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-[#D6DCD5]">
                  {item.tag}
                </span>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-[#5A6A63]" aria-label={`Calificación: ${item.rating} de 5 estrellas`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-[#2A2F2D] text-sm sm:text-base leading-relaxed font-normal">
                {item.comment}
              </p>

              <footer className="flex items-center justify-between border-t border-[#D6DCD5] pt-4 mt-2">
                <div className="flex flex-col">
                  <cite className="text-[#2A2F2D] font-semibold text-sm not-italic">
                    {item.name}
                  </cite>
                  <span className="text-xs text-[#5A6A63]">
                    {item.role}
                  </span>
                </div>
              </footer>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
}
