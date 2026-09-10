import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Layers, Plus, FolderTree, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Gestión de Categorías | Admin Aracon",
  description: "Estructura y jerarquía de categorías del catálogo.",
};

export default async function CategoriesAdminPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id")
    .order("name");

  if (error) {
    return (
      <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 flex items-center gap-3 text-rose-300">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">Error al cargar categorías: {error.message}</p>
      </div>
    );
  }

  const roots = categories?.filter((c) => !c.parent_id) ?? [];
  const getChildren = (parentId: string) =>
    categories?.filter((c) => c.parent_id === parentId) ?? [];

  const totalCategories = categories?.length ?? 0;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
              Categorías
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
              {totalCategories} {totalCategories === 1 ? "categoría" : "categorías"}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Organiza las colecciones y taxonomías para la navegación de la tienda.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition focus-visible:ring-2 focus-visible:ring-white shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </Link>
      </header>

      {/* Empty State */}
      {roots.length === 0 && (
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">Sin categorías</p>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Crea tu primera categoría para organizar las prendas por estilo, temporada o tipo.
            </p>
          </div>
          <Link
            href="/admin/categories/new"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition"
          >
            <Plus className="w-4 h-4" />
            Crear categoría
          </Link>
        </div>
      )}

      {/* Categories Hierarchy */}
      <div className="flex flex-col gap-4">
        {roots.map((root) => {
          const children = getChildren(root.id);

          return (
            <div
              key={root.id}
              className="bg-[#111114] border border-zinc-800/70 hover:border-zinc-700 rounded-2xl p-5 transition-all flex flex-col gap-3"
            >
              {/* Root row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm text-zinc-100">
                      {root.name}
                    </h2>
                    <span className="text-[11px] font-mono text-zinc-400">
                      /{root.slug}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {children.length} {children.length === 1 ? "subcategoría" : "subcategorías"}
                  </span>
                </div>
              </div>

              {/* Subcategories */}
              {children.length > 0 && (
                <div className="mt-2 pt-3 border-t border-zinc-800/50 pl-4 sm:pl-8 flex flex-col gap-2">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/40 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-mono text-xs">↳</span>
                        <span className="text-xs font-medium text-zinc-200">
                          {child.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        /{child.slug}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}