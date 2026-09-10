"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Category = {
  id: string;
  name: string;
};

export default function NewCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from("categories")
        .select("id, name")
        .is("parent_id", null)
        .order("name");
      setCategories(data ?? []);
    }
    loadCategories();
  }, []);

  function handleNameChange(value: string) {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, parent_id: parentId || null }),
      });

      setLoading(false);

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al crear la categoría");
        return;
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (err: unknown) {
      setLoading(false);
      setError((err as Error).message || "Ocurrió un error inesperado");
    }
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-8">
      {/* Top bar */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
        <Link
          href="/admin/categories"
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
          title="Volver a categorías"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
            Nueva Categoría
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Crea una categoría principal o subcategoría para clasificar tus productos.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-center gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60 text-zinc-200">
          <Layers className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
            Datos de la Categoría
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cat-name" className="text-xs font-medium text-zinc-300">
            Nombre de la categoría <span className="text-rose-400">*</span>
          </label>
          <input
            id="cat-name"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ej. Streetwear, Hoodies, Pantalones"
            required
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cat-slug" className="text-xs font-medium text-zinc-300">
            Slug (identificador web) <span className="text-rose-400">*</span>
          </label>
          <input
            id="cat-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="streetwear"
            required
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cat-parent" className="text-xs font-medium text-zinc-300">
            Categoría padre <span className="text-zinc-400 font-normal">(opcional)</span>
          </label>
          <select
            id="cat-parent"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          >
            <option value="">Ninguna (categoría raíz principal)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-zinc-400">
            Si seleccionas una categoría padre, esta se convertirá en una subcategoría.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
          <Link
            href="/admin/categories"
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Guardando...
              </>
            ) : (
              "Crear Categoría"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}