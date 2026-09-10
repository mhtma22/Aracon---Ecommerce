// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/supabase/auth";

const MAX_IMAGES = 8;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1. Verificar sesión
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Permisos insuficientes" }, { status: 403 });
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
  let variants: {
    color: string | null;
    size: string | null;
    stock: number;
  }[];

  try {
    variants = variantsJson ? JSON.parse(variantsJson) : [];
  } catch {
    return NextResponse.json({ error: "Variantes inválidas" }, { status: 400 });
  }

  const images = formData.getAll("images") as File[];

  if (!name || !slug || isNaN(price)) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, slug o precio inválido)" },
      { status: 400 }
    );
  }

  if (images.length > MAX_IMAGES) {
    return NextResponse.json(
      { error: `Solo se permiten hasta ${MAX_IMAGES} imágenes` },
      { status: 400 }
    );
  }

  for (const image of images) {
    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "Archivo de imagen inválido" }, { status: 400 });
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Cada imagen debe pesar como máximo 5 MB" },
        { status: 400 }
      );
    }

    if (!IMAGE_TYPES.has(image.type)) {
      return NextResponse.json(
        { error: "Formato no permitido. Usa JPG, PNG, WebP o AVIF" },
        { status: 400 }
      );
    }
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
    const uploadedPaths: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = IMAGE_TYPES.get(file.type)!;
      const filePath = `${product.id}/${crypto.randomUUID()}-${i}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) {
        if (uploadedPaths.length > 0) {
          await supabase.storage.from("products").remove(uploadedPaths);
        }
        await supabase.from("products").delete().eq("id", product.id);
        return NextResponse.json(
          { error: "No se pudieron subir todas las imágenes" },
          { status: 500 }
        );
      }

      uploadedPaths.push(filePath);

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
      await supabase.storage.from("products").remove(uploadedPaths);
      await supabase.from("products").delete().eq("id", product.id);
      return NextResponse.json({ error: "No se pudieron guardar las imágenes" }, { status: 500 });
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
      const { data: productImages } = await supabase
        .from("product_images")
        .select("url")
        .eq("product_id", product.id);
      const uploadedPaths = (productImages ?? [])
        .map(({ url }) => url.split("/storage/v1/object/public/products/")[1])
        .filter((path): path is string => Boolean(path));
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("products").remove(uploadedPaths);
      }
      await supabase.from("products").delete().eq("id", product.id);
      return NextResponse.json({ error: "No se pudieron guardar las variantes" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, product }, { status: 201 });
}
