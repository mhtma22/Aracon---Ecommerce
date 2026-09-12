"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthFormState = {
  error?: string;
  success?: string;
};

function getCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const { email, password } = getCredentials(formData);

  if (!email || !password) return { error: "Ingresa tu correo y contraseña." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: "Correo o contraseña incorrectos." };

  redirect("/products");
}

export async function register(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const { email, password } = getCredentials(formData);

  if (!email || !password) return { error: "Ingresa tu correo y contraseña." };
  if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: "No se pudo crear la cuenta. Inténtalo nuevamente." };
  if (data.session) redirect("/products");

  return { success: "Cuenta creada. Revisa tu correo para continuar." };
}
