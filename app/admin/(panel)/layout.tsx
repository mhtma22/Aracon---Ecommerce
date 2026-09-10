import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = {
  title: "Admin Panel | Aracon",
  description: "Panel de control y gestión administrativa de Aracon.",
  robots: {
    index: false,
    follow: false,
  },
};

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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col md:flex-row selection:bg-zinc-800 selection:text-white">
      {/* Responsive Minimalist Navigation Sidebar */}
      <AdminSidebar userEmail={user.email} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}