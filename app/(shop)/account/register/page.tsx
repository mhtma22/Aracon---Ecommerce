"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register, type AuthFormState } from "../actions";
import SubmitButton from "../SubmitButton";

const initialState: AuthFormState = {};

export default function AccountRegisterPage() {
  const [state, formAction] = useActionState(register, initialState);
  return <main className="min-h-screen bg-[#F4F5F2] flex items-center justify-center p-4"><form action={formAction} className="w-full max-w-md bg-white border border-[#D6DCD5] rounded-2xl p-6 flex flex-col gap-4"><h1 className="text-2xl font-bold text-[#2A2F2D]">Crear cuenta</h1><input name="email" type="email" required autoComplete="email" placeholder="Correo electrónico" className="border border-[#D6DCD5] rounded-xl px-3 py-2" /><input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="Contraseña (mínimo 8 caracteres)" className="border border-[#D6DCD5] rounded-xl px-3 py-2" />{state.error && <p className="text-sm text-[#5A6A63]" role="alert">{state.error}</p>}{state.success && <p className="text-sm text-[#5A6A63]" role="status">{state.success}</p>}<SubmitButton idleLabel="Crear cuenta" pendingLabel="Creando…" /><p className="text-sm text-[#5A6A63]">¿Ya tienes cuenta? <Link href="/account/login" className="underline">Iniciar sesión</Link></p></form></main>;
}
