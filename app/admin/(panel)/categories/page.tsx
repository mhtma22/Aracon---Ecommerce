// app/admin/(panel)/categories/page.tsx
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function CategoriesAdminPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id")
    .order("name");

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error al cargar categorías: {error.message}</p>
      </div>
    );
  }

  const roots = categories?.filter((c) => !c.parent_id) ?? [];
  const getChildren = (parentId: string) =>
    categories?.filter((c) => c.parent_id === parentId) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categorías</h1>
        <Link
          href="/admin/categories/new"
          className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition"
        >
          + Nueva categoría
        </Link>
      </div>

      {roots.length === 0 && (
        <p className="text-neutral-500">Aún no hay categorías creadas.</p>
      )}

      <div className="flex flex-col gap-3">
        {roots.map((root) => (
          <div
            key={root.id}
            className="border border-neutral-200 rounded-xl p-4 bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{root.name}</span>
              <span className="text-neutral-400 text-xs">{root.slug}</span>
            </div>

            {getChildren(root.id).length > 0 && (
              <div className="mt-3 pl-4 border-l border-neutral-200 flex flex-col gap-2">
                {getChildren(root.id).map((child) => (
                  <div key={child.id} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">↳ {child.name}</span>
                    <span className="text-neutral-400 text-xs">{child.slug}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}