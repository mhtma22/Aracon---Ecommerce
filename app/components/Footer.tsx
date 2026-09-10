import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F4F5F2] text-[#2A2F2D] border-t border-[#D6DCD5] pt-16 pb-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[#D6DCD5]">
        
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div>
            <Link 
              href="/" 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2A2F2D] inline-block"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              ARACON
            </Link>
            <p className="text-xs font-mono tracking-widest text-[#5A6A63] uppercase mt-0.5">
              Moda Urbana &bull; Lima, Perú
            </p>
          </div>

          <p className="text-[#5A6A63] text-sm leading-relaxed max-w-sm">
            Prendas de corte contemporáneo y confección meticulosa. Diseñadas para perdurar en el tiempo con materiales de alta calidad y un enfoque estético sobrio.
          </p>

          {/* Social Links - Minimalist pills */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram de Aracon" 
              className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#D6DCD5] flex items-center justify-center text-[#2A2F2D] hover:border-[#5A6A63] hover:text-[#5A6A63] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook de Aracon" 
              className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#D6DCD5] flex items-center justify-center text-[#2A2F2D] hover:border-[#5A6A63] hover:text-[#5A6A63] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="TikTok de Aracon" 
              className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#D6DCD5] flex items-center justify-center text-[#2A2F2D] hover:border-[#5A6A63] hover:text-[#5A6A63] transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.25 1.19 2.27 2.45 2.51.59.12 1.21.09 1.79-.08 1.16-.36 2.04-1.35 2.24-2.54.14-.81.13-1.64.13-2.46.01-4.91 0-9.82.01-14.73z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Colección */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#2A2F2D]">
            Colección
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-[#5A6A63]">
            <li><Link href="/products" className="hover:text-[#2A2F2D] transition">Ver Catálogo Completo</Link></li>
            <li><Link href="/#estilos" className="hover:text-[#2A2F2D] transition">Casual & Streetwear</Link></li>
            <li><Link href="/#estilos" className="hover:text-[#2A2F2D] transition">Formal Contemporáneo</Link></li>
            <li><Link href="/#estilos" className="hover:text-[#2A2F2D] transition">Activewear & Gym</Link></li>
            <li><Link href="/#estilos" className="hover:text-[#2A2F2D] transition">Ediciones Limitadas</Link></li>
          </ul>
        </div>

        {/* Column 3: Atención & Soporte */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#2A2F2D]">
            Servicio al Cliente
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-[#5A6A63]">
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Guía de Tallas</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Envíos & Tiempos de Entrega</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Cambios y Devoluciones</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Contacto Directo</a></li>
          </ul>
        </div>

        {/* Column 4: Información Corporativa */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#2A2F2D]">
            Institucional
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-[#5A6A63]">
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Sobre Aracon</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Compromiso de Sostenibilidad</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-[#2A2F2D] transition">Política de Privacidad</a></li>
            <li><Link href="/admin/login" className="hover:text-[#2A2F2D] transition">Acceso Administrativo</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3B0A7]">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-[#2A2F2D] font-medium">ARACON.PE</span>. Todos los derechos reservados.
        </p>

        {/* Subtle Payment Gateways */}
        <div className="flex items-center gap-2 opacity-80" aria-label="Métodos de pago aceptados">
          <span className="bg-[#FFFFFF] px-2 py-1 rounded border border-[#D6DCD5] text-[10px] font-mono text-[#5A6A63]">
            VISA
          </span>
          <span className="bg-[#FFFFFF] px-2 py-1 rounded border border-[#D6DCD5] text-[10px] font-mono text-[#5A6A63]">
            MASTERCARD
          </span>
          <span className="bg-[#FFFFFF] px-2 py-1 rounded border border-[#D6DCD5] text-[10px] font-mono text-[#5A6A63]">
            YAPE / PLIN
          </span>
          <span className="bg-[#FFFFFF] px-2 py-1 rounded border border-[#D6DCD5] text-[10px] font-mono text-[#5A6A63]">
            TRANSFERENCIA
          </span>
        </div>
      </div>
    </footer>
  );
}