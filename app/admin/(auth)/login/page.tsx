"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError("Credenciales incorrectas. Verifica el correo y la contraseña.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setLoading(false);
      setError((err as Error).message || "Ocurrió un error al intentar iniciar sesión.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Return to shop link */}
      <div className="w-full max-w-sm mb-6 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a la tienda
        </Link>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Brand header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
              ARACON ADMIN
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Acceso exclusivo para administradores
            </p>
          </div>
        </div>

        {/* Minimalist Card */}
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-zinc-300">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@aracon.pe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-zinc-300">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-3 flex items-center gap-2.5 text-rose-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <p className="text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando acceso...
                </>
              ) : (
                "Ingresar al Panel"
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-zinc-400">
          ARACON Streetwear &bull; Sistema de gestión interna
        </p>
      </div>
    </main>
  );
}