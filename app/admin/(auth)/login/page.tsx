"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0e0f0f]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ARACON<span className="text-neutral-500">.PE</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Panel de administración</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="border border-neutral-800 rounded-xl p-8 flex flex-col gap-5 shadow-2xl bg-neutral-900"
        >
          <div className="flex flex-col gap-1.5 bg">
            <label htmlFor="email" className="text-sm text-neutral-300">
              Correo
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@aracon.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border border-neutral-700 rounded-lg px-3 py-2.5 text-white placeholder:text-neutral-500 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-neutral-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-white placeholder:text-neutral-500 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-neutral-900 font-medium rounded-lg py-2.5 mt-1 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-neutral-600 text-xs mt-6 bg-#bf2661">
          Acceso restringido — solo personal autorizado
        </p>
      </div>
    </div>
  );
}