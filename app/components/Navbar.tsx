'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F5F2]/95 backdrop-blur-md border-b border-[#D6DCD5] transition-all">
      {/* Top Announcement Bar - Minimalist, quiet, informative */}
      <div className="w-full bg-[#D6DCD5]/60 text-[#2A2F2D] py-2 px-4 border-b border-[#D6DCD5] text-xs font-medium tracking-wide text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Envíos gratuitos a todo el Perú en compras mayores a S/ 199</span>
          <span className="text-[#A3B0A7]" aria-hidden="true">&bull;</span>
          <span className="hidden sm:inline text-[#5A6A63]">Usa el código <strong className="font-semibold text-[#2A2F2D]">ARACON10</strong> para 10% de descuento</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none rounded-lg py-1"
            aria-label="Aracon Inicio"
          >
            <span 
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2F2D] group-hover:text-[#5A6A63] transition-colors"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              ARACON
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#5A6A63] border border-[#D6DCD5] px-1.5 py-0.5 rounded uppercase hidden sm:inline-block bg-white/60">
              Lima
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación Principal">
          <Link 
            href="/" 
            className="text-sm font-medium text-[#2A2F2D] hover:text-[#5A6A63] transition-colors py-1 relative group focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none rounded"
          >
            Inicio
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2A2F2D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>

          <Link 
            href="/products" 
            className="text-sm font-medium text-[#2A2F2D] hover:text-[#5A6A63] transition-colors py-1 relative group focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none rounded flex items-center gap-1.5"
          >
            Colección
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A6A63]" />
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2A2F2D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>

          <Link 
            href="/#estilos" 
            className="text-sm font-medium text-[#2A2F2D] hover:text-[#5A6A63] transition-colors py-1 relative group focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none rounded"
          >
            Estilos
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2A2F2D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>

          <Link 
            href="/#marcas" 
            className="text-sm font-medium text-[#2A2F2D] hover:text-[#5A6A63] transition-colors py-1 relative group focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none rounded"
          >
            Alianzas
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2A2F2D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
        </nav>

        {/* Search Bar - Minimalist pill */}
        <div className="hidden lg:flex items-center relative flex-1 max-w-xs">
          <form role="search" className="w-full relative flex items-center" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-input" className="sr-only">Buscar prendas</label>
            <input 
              id="search-input"
              type="search" 
              placeholder="Buscar prendas, estilos..." 
              className="w-full bg-[#FFFFFF] text-[#2A2F2D] font-normal text-xs pl-9 pr-4 py-2 rounded-full border border-[#D6DCD5] focus:outline-none focus:border-[#5A6A63] focus:ring-1 focus:ring-[#5A6A63] placeholder-[#A3B0A7] transition"
            />
            <Search className="w-3.5 h-3.5 text-[#5A6A63] absolute left-3 pointer-events-none" aria-hidden="true" />
          </form>
        </div>

        {/* Actions & Icons */}
        <div className="flex items-center gap-3">
          {isAuthenticated === true ? (
            <span
              className="p-2 rounded-full text-[#2A2F2D] bg-[#D6DCD5]/30"
              aria-label="Sesión iniciada"
              title="Sesión iniciada"
            >
              <User className="w-4 h-4" aria-hidden="true" />
            </span>
          ) : isAuthenticated === false ? (
            <Link
              href="/account/login"
              className="rounded-full px-3 py-2 text-xs font-semibold text-[#2A2F2D] hover:bg-[#D6DCD5]/50 focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none transition"
            >
              Iniciar sesión
            </Link>
          ) : null}

          {/* Cart Icon Button */}
          <Link 
            href="/products" 
            className="relative p-2 rounded-full text-[#2A2F2D] hover:bg-[#D6DCD5]/50 focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none transition flex items-center justify-center"
            aria-label="Bolsa de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#5A6A63]" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2A2F2D] hover:bg-[#D6DCD5]/50 focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none transition"
            aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav 
          id="mobile-navigation" 
          className="md:hidden bg-[#F4F5F2] border-t border-[#D6DCD5] px-6 py-6 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200" 
          aria-label="Menú Móvil"
        >
          {/* Mobile Search */}
          <div className="relative w-full mb-2">
            <label htmlFor="mobile-search-input" className="sr-only">Buscar prendas en móvil</label>
            <input 
              id="mobile-search-input"
              type="search" 
              placeholder="Buscar en la tienda..." 
              className="w-full bg-[#FFFFFF] text-[#2A2F2D] font-normal text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#D6DCD5] focus:outline-none focus:border-[#5A6A63] placeholder-[#A3B0A7]"
            />
            <Search className="w-4 h-4 text-[#5A6A63] absolute left-3.5 top-3 pointer-events-none" aria-hidden="true" />
          </div>

          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#2A2F2D] hover:text-[#5A6A63] py-2 border-b border-[#D6DCD5] flex items-center justify-between"
          >
            Inicio
            <ArrowRight className="w-4 h-4 text-[#A3B0A7]" />
          </Link>

          <Link 
            href="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#2A2F2D] hover:text-[#5A6A63] py-2 border-b border-[#D6DCD5] flex items-center justify-between"
          >
            Colección Completa
            <ArrowRight className="w-4 h-4 text-[#A3B0A7]" />
          </Link>

          <Link 
            href="/#estilos" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#2A2F2D] hover:text-[#5A6A63] py-2 border-b border-[#D6DCD5] flex items-center justify-between"
          >
            Explorar Estilos
            <ArrowRight className="w-4 h-4 text-[#A3B0A7]" />
          </Link>

          <Link 
            href="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-mono tracking-wider text-[#5A6A63] pt-2 flex items-center gap-2"
          >
            <span>&bull; Acceso Administrativo</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
