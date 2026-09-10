"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBrandPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function updateName(value: string) {
    setName(value);
    setSlug(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(null);
    const response = await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, slug, logo_url: logoUrl }) });
    if (!response.ok) { const data = await response.json(); setError(data.error ?? "No se pudo crear la marca"); setLoading(false); return; }
    router.push("/admin/brands"); router.refresh();
  }

  return <div className="max-w-xl"><Link href="/admin/brands" className="text-sm text-zinc-400 hover:text-white">← Volver a marcas</Link><h1 className="text-2xl font-bold text-white mt-6 mb-6">Nueva marca</h1><form onSubmit={submit} className="bg-[#111114] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4"><label className="text-sm text-zinc-300">Nombre<input value={name} onChange={(e) => updateName(e.target.value)} required className="mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white" /></label><label className="text-sm text-zinc-300">Slug<input value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white" /></label><label className="text-sm text-zinc-300">URL del logo (opcional)<input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white" /></label>{error && <p className="text-sm text-rose-300">{error}</p>}<button disabled={loading} className="rounded-xl bg-white text-black py-2 font-semibold disabled:opacity-50">{loading ? "Guardando..." : "Crear marca"}</button></form></div>;
}
