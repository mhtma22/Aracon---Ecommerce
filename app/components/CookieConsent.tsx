"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aracon-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
  }, []);

  function saveConsent(value: "accepted" | "rejected") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Preferencias de cookies"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-zinc-800 bg-[#111114] p-4 text-white shadow-2xl sm:right-6 sm:left-auto"
    >
      <p className="text-sm font-semibold">Usamos cookies</p>
      <p id="cookie-consent-description" className="mt-1 text-xs leading-relaxed text-zinc-400">
        Usamos cookies necesarias para que Aracon funcione correctamente. Puedes aceptar o rechazar las cookies opcionales.
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => saveConsent("rejected")}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => saveConsent("accepted")}
          className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
        >
          Aceptar
        </button>
      </div>
    </aside>
  );
}
