"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Tag,
  ExternalLink, 
  LogOut, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface AdminSidebarProps {
  userEmail?: string;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Productos",
    href: "/admin/products",
    icon: Package,
    exact: false,
  },
  {
    label: "Categorías",
    href: "/admin/categories",
    icon: Layers,
    exact: false,
  },
  {
    label: "Marcas",
    href: "/admin/brands",
    icon: Tag,
    exact: false,
  },
];

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Error signing out:", err);
      setLoggingOut(false);
    }
  };

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0c0c0e] border-b border-zinc-800/80 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white text-lg" style={{ fontFamily: "Lexend, sans-serif" }}>
            ARACON
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
            Admin
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 focus-visible:ring-2 focus-visible:ring-zinc-400 transition"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container (Permanent on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-zinc-800/70 flex flex-col justify-between p-5 transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-auto ${
          isOpen
            ? "translate-x-0 shadow-2xl visible pointer-events-auto"
            : "-translate-x-full invisible md:visible pointer-events-none md:pointer-events-auto"
        }`}
      >
        {/* Upper section: Logo & Nav */}
        <div className="flex flex-col gap-6">
          {/* Logo Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-white font-black text-sm group-hover:border-zinc-500 transition">
                A
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-white text-base block leading-none" style={{ fontFamily: "Lexend, sans-serif" }}>
                  ARACON
                </span>
                <span className="text-[10px] text-zinc-400 tracking-wider font-mono">
                  CONTROL PANEL
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 text-zinc-400 hover:text-white rounded"
              aria-label="Cerrar panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1" aria-label="Navegación principal">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 px-3 mb-1">
              General
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${active ? "text-zinc-100" : "text-zinc-400"}`} />
                  <span>{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Lower section: User profile & External Actions */}
        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/60">
          {/* Public Store Link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              Ver tienda online
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>

          {/* User & Sign Out */}
          <div className="bg-zinc-900/40 rounded-xl p-3 border border-zinc-800/60 flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-2">
              <p className="text-xs font-medium text-zinc-200 truncate">
                {userEmail || "Administrador"}
              </p>
              <p className="text-[10px] text-zinc-400 font-mono">Sesión activa</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={loggingOut}
              title="Cerrar sesión"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 focus-visible:ring-2 focus-visible:ring-zinc-400 transition disabled:opacity-50"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
