export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white border-t-4 border-[#ff0055] pt-12 pb-6 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b-2 border-gray-800">
        
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <a href="/" className="text-4xl sm:text-5xl font-black text-[#ccff00] tracking-wider focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none rounded" style={{ fontFamily: 'Staatliches, sans-serif' }}>
              ARACON<span className="text-white">.PE</span>
            </a>
            <span className="bg-[#ff0055] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider transform rotate-3 border border-black shadow-[2px_2px_0px_#000]">
              VERIFIED BRAND
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed max-w-sm" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Tenemos ropa streetwear que se adapta a tu actitud sin compromisos. 
            Prendas diseñadas en Perú para destacar con estilo urbano para hombre y mujer.
          </p>

          {/* Sticker Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nuestro Facebook"
              className="bg-[#ccff00] p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all"
            >
              <img src="/facebookletter.svg" alt="" width={16} height={16} decoding="async" loading="lazy" className="w-4 h-4 filter brightness-0" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nuestro Instagram"
              className="bg-[#ff0055] p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all"
            >
              <img src="/instagram.svg" alt="" width={16} height={16} decoding="async" loading="lazy" className="w-4 h-4 filter invert brightness-200" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nuestro GitHub"
              className="bg-[#00e5ff] p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-all"
            >
              <img src="/github.svg" alt="" width={16} height={16} decoding="async" loading="lazy" className="w-4 h-4 filter brightness-0" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nuestro TikTok"
              className="bg-white p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none transition-all"
            >
              <img src="/tiktok.svg" alt="" width={16} height={16} decoding="async" loading="lazy" className="w-4 h-4 filter brightness-0" />
            </a>
          </div>
        </div>

        {/* Column 2: Compañía */}
        <div className="flex flex-col gap-4">
          <h2 
            className="text-xl font-bold text-[#ccff00] uppercase tracking-wider flex items-center gap-2"
            style={{ fontFamily: 'Staatliches, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#ff0055] inline-block" aria-hidden="true"></span> COMPAÑÍA
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-300 font-medium">
            <li><a href="#" className="hover:text-[#ccff00] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Nosotros</a></li>
            <li><a href="#" className="hover:text-[#ccff00] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Colecciones Destacadas</a></li>
            <li><a href="#" className="hover:text-[#ccff00] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Lookbook Urban 2026</a></li>
            <li><a href="#" className="hover:text-[#ccff00] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Trabaja con Nosotros</a></li>
          </ul>
        </div>

        {/* Column 3: Ayuda */}
        <div className="flex flex-col gap-4">
          <h2 
            className="text-xl font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-2"
            style={{ fontFamily: 'Staatliches, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#ccff00] inline-block" aria-hidden="true"></span> AYUDA
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-300 font-medium">
            <li><a href="#" className="hover:text-[#00e5ff] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Atención al Cliente</a></li>
            <li><a href="#" className="hover:text-[#00e5ff] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Envíos & Entregas</a></li>
            <li><a href="#" className="hover:text-[#00e5ff] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-[#00e5ff] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Políticas de Privacidad</a></li>
          </ul>
        </div>

        {/* Column 4: FAQ & Recursos */}
        <div className="flex flex-col gap-4">
          <h2 
            className="text-xl font-bold text-[#ff0055] uppercase tracking-wider flex items-center gap-2"
            style={{ fontFamily: 'Staatliches, sans-serif' }}
          >
            <span className="w-2 h-2 bg-[#00e5ff] inline-block" aria-hidden="true"></span> RECURSOS
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-300 font-medium">
            <li><a href="#" className="hover:text-[#ff0055] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Gestión de Pedidos</a></li>
            <li><a href="#" className="hover:text-[#ff0055] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Métodos de Pago</a></li>
            <li><a href="#" className="hover:text-[#ff0055] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Libro de Reclamaciones</a></li>
            <li><a href="#" className="hover:text-[#ff0055] hover:translate-x-1 focus-visible:underline focus-visible:outline-none inline-block transition-all">Preguntas Frecuentes</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p className="font-semibold text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="text-[#ccff00]">ARACON.PE</span>. Todos los derechos reservados. Streetwear de edición limitada.
        </p>

        {/* Payment Gateways */}
        <div className="flex items-center gap-2 bg-[#121214] px-4 py-2 rounded-2xl border border-gray-800 shadow-inner" aria-label="Métodos de pago aceptados">
          <span className="bg-white p-1 rounded border border-black hover:scale-110 transition-transform">
            <img src="/Visa.svg" alt="Visa" width={32} height={20} decoding="async" loading="lazy" className="w-8 h-5 object-contain" />
          </span>
          <span className="bg-white p-1 rounded border border-black hover:scale-110 transition-transform">
            <img src="/Mastercard.svg" alt="Mastercard" width={32} height={20} decoding="async" loading="lazy" className="w-8 h-5 object-contain" />
          </span>
          <span className="bg-white p-1 rounded border border-black hover:scale-110 transition-transform">
            <img src="/G%20Pay.svg" alt="Google Pay" width={32} height={20} decoding="async" loading="lazy" className="w-8 h-5 object-contain" />
          </span>
          <span className="bg-white p-1 rounded border border-black hover:scale-110 transition-transform">
            <img src="/Pay.svg" alt="Apple Pay" width={32} height={20} decoding="async" loading="lazy" className="w-8 h-5 object-contain" />
          </span>
          <span className="bg-white p-1 rounded border border-black hover:scale-110 transition-transform">
            <img src="/PayPal.svg" alt="PayPal" width={32} height={20} decoding="async" loading="lazy" className="w-8 h-5 object-contain" />
          </span>
        </div>
      </div>
    </footer>
  );
}