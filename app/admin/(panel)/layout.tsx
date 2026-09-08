import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ChartLine } from 'lucide-react';
import { DatabaseSearch } from 'lucide-react';
import { ListPlus } from "lucide-react";
import { LayersArrowDown } from "lucide-react";
import { ListSortDescending } from "lucide-react";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-neutral-900 text-black p-6">
        <div className="flex justify-center items-center border-b-2 border-white/100">
          <h1 className="text-xl text-white" style={{ fontFamily: "Lexend, sans-serif" }}>ARACON.PE</h1>
        </div>
        <div className="mt-4 flex flex-col ml-4">
          <ul className="list-none">
            <li className="mb-2" >
              <a href="/admin/dashboard" className="text-white hover:text-white/80 flex flex-row items-center text-center" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
              <ChartLine className="w-5 h-5 text-white mr-2" />
                Estadisticas
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/categories" className="text-white hover:text-white/80 flex flex-row items-center text-center" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
                <ListSortDescending className="w-5 h-5 text-white mr-2" />
                Categorias
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/products" className="text-white hover:text-white/80 flex flex-row items-center text-center" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
                <ListPlus className="w-5 h-5 text-white mr-2" />
                Productos
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/orders" className="text-white hover:text-white/80 flex flex-row items-center text-center" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
                <LayersArrowDown className="w-5 h-5 text-white mr-2 hover:text-white/80" />
                Pedidos
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/query" className="text-white hover:text-white/80 flex flex-row items-center text-center" style={{fontFamily: 'Smooch Sans', fontSize: '24px'}}>
                <DatabaseSearch className="w-5 h-5 text-white mr-2" />
                Consultas
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 bg-neutral-50 p-8">{children}</main>
    </div>
  );
}