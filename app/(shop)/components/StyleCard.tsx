"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type StyleCardProps = {
  className: string;
  image: string;
  imageAlt: string;
  width: number;
  sizes: string;
  label: string;
  title: string;
  description: string;
};

export default function StyleCard({
  className,
  image,
  imageAlt,
  width,
  sizes,
  label,
  title,
  description,
}: StyleCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      href="/products"
      onClick={(event) => {
        if (isLoading) {
          event.preventDefault();
          return;
        }

        setIsLoading(true);
      }}
      aria-busy={isLoading}
      className={`${className} relative h-[340px] rounded-3xl overflow-hidden border border-[#D6DCD5] group shadow-xs hover:shadow-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#5A6A63] focus-visible:outline-none`}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={width}
        height={340}
        loading="lazy"
        sizes={sizes}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />

      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/65 text-white" role="status">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
          <span className="text-sm font-medium">Cargando colección…</span>
        </div>
      )}

      <div className="absolute bottom-6 left-6 flex flex-col gap-1">
        <span className="bg-[#FFFFFF]/90 text-[#2A2F2D] text-[10px] font-mono font-medium px-2 py-0.5 rounded w-max uppercase tracking-wider">
          {label}
        </span>
        <h3 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "Lexend, sans-serif" }}>
          {title}
        </h3>
        <span className="text-xs text-zinc-300 font-medium group-hover:text-white transition-colors">
          {description} &rarr;
        </span>
      </div>
    </Link>
  );
}
