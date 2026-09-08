// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1. Verificar sesión
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2. Leer el FormData
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const oldPriceRaw = formData.get("old_price") as string;
  const oldPrice = oldPriceRaw ? parseFloat(oldPriceRaw) : null;
  const categoryId = formData.get("category_id") as string;
  const variantsJson = formData.get("variants") as string;
  const variants = JSON.parse(variantsJson) as {
    color: string | null;
    size: string | null;
    stock: number;
  }[];

  const images = formData.getAll("images") as File[];

  if (!name || !slug || isNaN(price)) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, slug o precio inválido)" },
      { status: 400 }
    );
  }

  // 3. Insertar el producto
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      description,
      price,
      old_price: oldPrice,
      category_id: categoryId || null,
    })
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // 4. Subir imágenes y guardar sus URLs
  if (images.length > 0) {
    const imageRows = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split(".").pop();
      const filePath = `${product.id}/${Date.now()}-${i}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) {
        return NextResponse.json(
          { error: `Error subiendo imagen: ${uploadError.message}` },
          { status: 500 }
        );
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath);

      imageRows.push({
        product_id: product.id,
        url: publicUrl,
        position: i,
      });
    }

    const { error: imagesError } = await supabase
      .from("product_images")
      .insert(imageRows);

    if (imagesError) {
      return NextResponse.json({ error: imagesError.message }, { status: 500 });
    }
  }

  // 5. Insertar variantes
  if (variants.length > 0) {
    const variantRows = variants.map((v) => ({
      product_id: product.id,
      color: v.color || null,
      size: v.size || null,
      stock: v.stock,
    }));

    const { error: variantsError } = await supabase
      .from("product_variants")
      .insert(variantRows);

    if (variantsError) {
      return NextResponse.json({ error: variantsError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, product }, { status: 201 });
}