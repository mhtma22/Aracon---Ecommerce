"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthFormState } from "../actions";
import SubmitButton from "../SubmitButton";

const initialState: AuthFormState = {};

export default function AccountLoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return <main className="min-h-screen bg-[#F4F5F2] flex items-center justify-center p-4"><form action={formAction} className="w-full max-w-md bg-white border border-[#D6DCD5] rounded-2xl p-6 flex flex-col gap-4"><h1 className="text-2xl font-bold text-[#2A2F2D]">Iniciar sesión</h1><input name="email" type="email" required autoComplete="email" placeholder="Correo electrónico" className="border border-[#D6DCD5] rounded-xl px-3 py-2" /><input name="password" type="password" required autoComplete="current-password" placeholder="Contraseña" className="border border-[#D6DCD5] rounded-xl px-3 py-2" />{state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}<SubmitButton idleLabel="Ingresar" pendingLabel="Ingresando…" /><p className="text-sm text-[#5A6A63]">¿No tienes cuenta? <Link href="/account/register" className="underline">Crear cuenta</Link></p></form></main>;
}
