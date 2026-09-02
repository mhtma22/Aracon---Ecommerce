'use client';

import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] border-b-4 border-[#ccff00]">
      {/* Top Announcement Marquee Bar */}
      <div className="w-full bg-[#ccff00] text-black py-1.5 overflow-hidden border-b-2 border-black font-black text-xs uppercase tracking-widest select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          <span className="flex items-center gap-2">🔥 ENVÍOS GRATIS A TODO EL PERÚ EN COMPRAS DESDE S/199</span>
          <span aria-hidden="true">✦</span>
          <span className="flex items-center gap-2">⚡ USA EL CÓDIGO <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded font-mono">ARACON20</span> PARA 20% OFF</span>
          <span aria-hidden="true">✦</span>
          <span className="flex items-center gap-2">💥 NUEVA COLECCIÓN URBAN DROP 2026</span>
          <span aria-hidden="true">✦</span>
          <span className="flex items-center gap-2">🔥 ENVÍOS GRATIS A TODO EL PERÚ EN COMPRAS DESDE S/199</span>
          <span aria-hidden="true">✦</span>
          <span className="flex items-center gap-2">⚡ USA EL CÓDIGO <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded font-mono">ARACON20</span> PARA 20% OFF</span>
          <span aria-hidden="true">✦</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Sticker */}
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="group flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none rounded-lg p-1"
            aria-label="Aracon.pe Inicio"
          >
            <span 
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider group-hover:text-[#ccff00] transition-colors"
              style={{ fontFamily: 'Staatliches, sans-serif' }}
            >
              ARACON<span className="text-[#ff0055]">.PE</span>
            </span>
          </a>
          <span 
            className="hidden lg:inline-block bg-[#ff0055] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter transform -rotate-3 border border-black shadow-[2px_2px_0px_#000]"
            style={{ fontFamily: 'Staatliches, sans-serif' }}
          >
            LIMITED DROP
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación Principal">
          <a 
            href="/" 
            className="text-lg font-bold text-white hover:text-[#ccff00] hover:underline decoration-[#ff0055] underline-offset-8 decoration-4 focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none rounded px-1 transition-all"
            style={{ fontFamily: 'Smooch Sans, sans-serif', fontSize: '24px' }}
          >
            INICIO
          </a>
          <a 
            href="/products" 
            className="relative text-lg font-bold text-white hover:text-[#ccff00] hover:underline decoration-[#ff0055] underline-offset-8 decoration-4 focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none rounded px-1 transition-all flex items-center gap-1"
            style={{ fontFamily: 'Smooch Sans, sans-serif', fontSize: '24px' }}
          >
            TIENDA
            <span className="bg-[#ccff00] text-black text-[9px] font-black px-1.5 py-0.2 rounded border border-black font-sans uppercase">
              HOT
            </span>
          </a>
          <a 
            href="/cart" 
            className="text-lg font-bold text-white hover:text-[#ccff00] hover:underline decoration-[#ff0055] underline-offset-8 decoration-4 focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none rounded px-1 transition-all"
            style={{ fontFamily: 'Smooch Sans, sans-serif', fontSize: '24px' }}
          >
            CARRITO
          </a>
        </nav>

        {/* Search Bar (Maximalist Styled + Accessible) */}
        <div className="hidden sm:flex items-center relative flex-1 max-w-xs md:max-w-md mx-2">
          <form role="search" className="w-full relative flex items-center" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-input" className="sr-only">Buscar prendas</label>
            <input 
              id="search-input"
              type="search" 
              placeholder="Buscar poleras, casacas, pantalones..." 
              className="w-full bg-white text-black font-semibold text-sm pl-10 pr-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-4 focus:ring-[#ff0055] placeholder-gray-500 shadow-[3px_3px_0px_#ccff00]"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            />
            <svg 
              className="w-5 h-5 text-black absolute left-3 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
        </div>

        {/* Actions & Icons */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <a 
            href="/cart" 
            className="relative bg-[#000] border-2 border-[#ccff00] p-2.5 rounded-full hover:bg-[#ccff00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:outline-none transition-all shadow-[3px_3px_0px_#ff0055] group"
            aria-label="Carrito de Compras, 2 productos agregados"
          >
            <img 
              src="/carrito.svg" 
              alt="" 
              width={20}
              height={20}
              decoding="async"
              className="w-5 h-5 filter invert group-hover:invert-0 transition-all" 
            />
            <span className="absolute -top-1 -right-1 bg-[#ff0055] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-black shadow-[1px_1px_0px_#000]">
              2
            </span>
          </a>

          {/* Account Icon Button */}
          <a 
            href="/account" 
            className="bg-[#000] border-2 border-white p-2.5 rounded-full hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:outline-none transition-all shadow-[3px_3px_0px_#00e5ff] group"
            aria-label="Mi Cuenta de Usuario"
          >
            <img 
              src="/cuenta.svg" 
              alt="" 
              width={20}
              height={20}
              decoding="async"
              className="w-5 h-5 filter invert group-hover:invert-0 transition-all" 
            />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-[#ccff00] text-black p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-navigation" className="md:hidden bg-black border-t-2 border-[#ccff00] px-4 pt-3 pb-6 flex flex-col gap-4" aria-label="Menú Móvil">
          <div className="relative w-full">
            <label htmlFor="mobile-search-input" className="sr-only">Buscar prendas en móvil</label>
            <input 
              id="mobile-search-input"
              type="search" 
              placeholder="Buscar prendas..." 
              className="w-full bg-white text-black font-semibold text-sm pl-10 pr-4 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#ccff00] focus:outline-none focus:ring-2 focus:ring-[#ff0055]"
            />
            <svg className="w-5 h-5 text-black absolute left-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <a href="/" className="text-xl font-black text-white hover:text-[#ccff00] py-1 border-b border-gray-800 focus:text-[#ccff00]">INICIO</a>
          <a href="/products" className="text-xl font-black text-[#ccff00] hover:text-white py-1 border-b border-gray-800 flex justify-between items-center focus:text-white">
            TIENDA <span className="bg-[#ff0055] text-white text-xs px-2 py-0.5 rounded font-mono">NEW DROPS</span>
          </a>
          <a href="/cart" className="text-xl font-black text-white hover:text-[#ccff00] py-1 border-b border-gray-800 focus:text-[#ccff00]">CARRITO DE COMPRAS</a>
        </nav>
      )}
    </header>
  );
}
