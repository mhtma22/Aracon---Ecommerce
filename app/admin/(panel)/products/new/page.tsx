"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  UploadCloud, 
  AlertCircle, 
  Check, 
  Loader2,
  Package,
  Layers,
  DollarSign
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Category = {
  id: string;
  name: string;
};

type Brand = {
  id: string;
  name: string;
};

type Variant = {
  color: string;
  size: string;
  stock: string;
};

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([
    { color: "", size: "", stock: "10" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadCatalogOptions() {
      const [{ data: categoryData }, { data: brandData }] = await Promise.all([
        supabase.from("categories").select("id, name").order("name"),
        supabase.from("brands").select("id, name").eq("is_active", true).order("name"),
      ]);
      setCategories(categoryData ?? []);
      setBrands(brandData ?? []);
    }
    loadCatalogOptions();
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

  function addVariant() {
    setVariants([...variants, { color: "", size: "", stock: "" }]);
  }

  function removeVariant(index: number) {
    if (variants.length <= 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: keyof Variant, value: string) {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("price", price);
      if (oldPrice) formData.append("old_price", oldPrice);
      formData.append("category_id", categoryId);
      formData.append("brand_id", brandId);

      const cleanVariants = variants
        .filter((v) => v.stock !== "")
        .map((v) => ({
          color: v.color || null,
          size: v.size || null,
          stock: parseInt(v.stock, 10),
        }));
      formData.append("variants", JSON.stringify(cleanVariants));

      images.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al crear el producto");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      setLoading(false);
      setError((err as Error).message || "Ocurrió un error inesperado");
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Top bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
            title="Volver a productos"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
              Nuevo Producto
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Completa los datos para publicar una nueva prenda en el catálogo.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-center gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Card 1: Información Básica */}
        <section className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60 text-zinc-200">
            <Package className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Información Principal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-medium text-zinc-300">
                Nombre de la prenda <span className="text-rose-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej. Hoodie Oversize Acid Wash"
                required
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-xs font-medium text-zinc-300">
                Slug (URL amigable) <span className="text-rose-400">*</span>
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="hoodie-oversize-acid-wash"
                required
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-xs font-medium text-zinc-300">
              Descripción del producto
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe los detalles de confección, corte, materiales y recomendaciones de lavado..."
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition resize-none"
            />
          </div>
        </section>

        {/* Card 2: Precios y Categoría */}
        <section className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60 text-zinc-200">
            <DollarSign className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Precios y Clasificación
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-xs font-medium text-zinc-300">
                Precio actual (S/) <span className="text-rose-400">*</span>
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="149.00"
                required
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="oldPrice" className="text-xs font-medium text-zinc-300">
                Precio anterior (S/) <span className="text-zinc-400 font-normal">(opcional)</span>
              </label>
              <input
                id="oldPrice"
                type="number"
                step="0.01"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="199.00"
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="categoryId" className="text-xs font-medium text-zinc-300">
                Categoría
              </label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="brandId" className="text-xs font-medium text-zinc-300">
                Marca
              </label>
              <select
                id="brandId"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
              >
                <option value="">Sin marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Card 3: Galería de Imágenes */}
        <section className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60 text-zinc-200">
            <UploadCloud className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Imágenes de la Prenda
            </h2>
          </div>

          <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 transition group cursor-pointer relative bg-zinc-900/20">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Arrastra o haz clic para subir imágenes
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Formatos recomendados: WebP, AVIF o PNG (máx. 5MB por imagen)
              </p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-zinc-400">
                {images.length} archivo(s) seleccionado(s):
              </span>
              <div className="flex flex-wrap gap-2">
                {images.map((img, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    {img.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Card 4: Variantes e Inventario */}
        <section className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2 text-zinc-200">
              <Layers className="w-4 h-4 text-zinc-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Variantes y Stock
              </h2>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-white transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar variante
            </button>
          </div>

          <p className="text-xs text-zinc-400">
            Define las combinaciones de color, talla y las unidades disponibles en bodega.
          </p>

          <div className="flex flex-col gap-3">
            {variants.map((variant, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center bg-zinc-900/30 p-3 rounded-xl border border-zinc-800/60"
              >
                <div className="col-span-4 sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Color (ej. Negro)"
                    value={variant.color}
                    onChange={(e) => updateVariant(index, "color", e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="col-span-4 sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Talla (ej. M / L)"
                    value={variant.size}
                    onChange={(e) => updateVariant(index, "size", e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, "stock", e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="col-span-1 flex justify-center">
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                      title="Eliminar variante"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando prenda...
              </>
            ) : (
              "Crear Producto"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
