"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SHOW_DELAY = 150;

export default function GlobalLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const isVisible = useRef(false);
  const pendingRequests = useRef(0);
  const navigationPending = useRef(false);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const originalFetch = window.fetch;

    const startLoading = () => {
      if (showTimer.current || isVisible.current) return;

      showTimer.current = setTimeout(() => {
        showTimer.current = null;
        isVisible.current = true;
        setVisible(true);
      }, SHOW_DELAY);
    };

    const finishLoading = () => {
      if (navigationPending.current || pendingRequests.current > 0) return;

      if (showTimer.current) {
        clearTimeout(showTimer.current);
        showTimer.current = null;
      }

      isVisible.current = false;
      setVisible(false);
    };

    window.fetch = async (...args) => {
      pendingRequests.current += 1;
      startLoading();

      try {
        return await originalFetch(...args);
      } finally {
        pendingRequests.current = Math.max(0, pendingRequests.current - 1);
        finishLoading();
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      navigationPending.current = true;
      startLoading();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      window.fetch = originalFetch;
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    navigationPending.current = false;

    if (pendingRequests.current === 0) {
      if (showTimer.current) {
        clearTimeout(showTimer.current);
        showTimer.current = null;
      }

      isVisible.current = false;
      setVisible(false);
    }
  }, [pathname, searchParams]);

  useEffect(() => () => {
    if (showTimer.current) clearTimeout(showTimer.current);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      aria-label="Cargando"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="progressbar"
    >
      <div className="h-full w-full origin-left bg-black animate-[loading-bar_1s_ease-in-out_infinite]" />
    </div>
  );
}
