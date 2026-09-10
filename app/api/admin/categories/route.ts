import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/supabase/auth";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Permisos insuficientes" }, { status: 403 });
  }

  const body = await request.json();
  const { name, slug, parent_id } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Nombre y slug son obligatorios" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      parent_id: parent_id || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, category: data }, { status: 201 });
}
