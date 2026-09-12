export default function Loading() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-black animate-pulse"
      role="progressbar"
      aria-label="Cargando página"
    />
  );
}
