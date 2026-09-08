// app/admin/(panel)/categories/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-6 text-neutral-900">Nueva categoría</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-neutral-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="border border-neutral-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-neutral-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-neutral-700">
            Categoría padre (opcional)
          </label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2"
          >
            <option value="">Ninguna (categoría raíz)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-900 text-white rounded-lg py-2.5 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear categoría"}
        </button>
      </form>
    </div>
  );
}