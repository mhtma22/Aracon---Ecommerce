"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AccountLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(null);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) { setError("Correo o contraseña incorrectos."); setLoading(false); return; }
    router.push("/products"); router.refresh();
  }

  return <main className="min-h-screen bg-[#F4F5F2] flex items-center justify-center p-4"><form onSubmit={submit} className="w-full max-w-md bg-white border border-[#D6DCD5] rounded-2xl p-6 flex flex-col gap-4"><h1 className="text-2xl font-bold text-[#2A2F2D]">Iniciar sesión</h1><input type="email" required autoComplete="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-[#D6DCD5] rounded-xl px-3 py-2" /><input type="password" required autoComplete="current-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-[#D6DCD5] rounded-xl px-3 py-2" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="rounded-xl bg-[#2A2F2D] text-white py-2 disabled:opacity-50">{loading ? "Ingresando..." : "Ingresar"}</button><p className="text-sm text-[#5A6A63]">¿No tienes cuenta? <Link href="/account/register" className="underline">Crear cuenta</Link></p></form></main>;
}
