"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AccountRegisterPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false); const router = useRouter();
  async function submit(event: React.FormEvent) { event.preventDefault(); setLoading(true); setError(null); if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); setLoading(false); return; } const { data, error } = await createClient().auth.signUp({ email, password }); if (error) { setError("No se pudo crear la cuenta."); setLoading(false); return; } if (data.session) router.push("/products"); else setError("Cuenta creada. Revisa tu correo para continuar."); setLoading(false); }
  return <main className="min-h-screen bg-[#F4F5F2] flex items-center justify-center p-4"><form onSubmit={submit} className="w-full max-w-md bg-white border border-[#D6DCD5] rounded-2xl p-6 flex flex-col gap-4"><h1 className="text-2xl font-bold text-[#2A2F2D]">Crear cuenta</h1><input type="email" required autoComplete="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-[#D6DCD5] rounded-xl px-3 py-2" /><input type="password" required minLength={8} autoComplete="new-password" placeholder="Contraseña (mínimo 8 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-[#D6DCD5] rounded-xl px-3 py-2" />{error && <p className="text-sm text-[#5A6A63]">{error}</p>}<button disabled={loading} className="rounded-xl bg-[#2A2F2D] text-white py-2 disabled:opacity-50">{loading ? "Creando..." : "Crear cuenta"}</button><p className="text-sm text-[#5A6A63]">¿Ya tienes cuenta? <Link href="/account/login" className="underline">Iniciar sesión</Link></p></form></main>;
}
