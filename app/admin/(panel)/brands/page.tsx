import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Plus, Tag, AlertCircle } from "lucide-react";

export default async function BrandsAdminPage() {
  const supabase = await createClient();
  const { data: brands, error } = await supabase.from("brands").select("id, name, slug, is_active").order("name");

  if (error) return <div className="text-rose-300">Error al cargar marcas.</div>;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Marcas</h1>
          <p className="text-zinc-400 text-sm mt-1">Gestiona las marcas disponibles en el catálogo.</p>
        </div>
        <Link href="/admin/brands/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200">
          <Plus className="w-4 h-4" /> Nueva marca
        </Link>
      </header>
      {brands?.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => <article key={brand.id} className="bg-[#111114] border border-zinc-800/70 rounded-2xl p-5">
          <div className="flex items-center gap-3"><Tag className="w-5 h-5 text-zinc-400" /><div><h2 className="font-semibold text-white">{brand.name}</h2><p className="text-xs text-zinc-400">/{brand.slug}</p></div></div>
          <span className="mt-4 inline-block text-[10px] uppercase tracking-wider text-zinc-400">{brand.is_active ? "Activa" : "Inactiva"}</span>
        </article>)}
      </div> : <div className="text-zinc-400">No hay marcas creadas.</div>}
    </div>
  );
}
