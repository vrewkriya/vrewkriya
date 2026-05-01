"use client";
import { useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

export default function ScrollUpOnMount() {
  const lenis = useLenis();

  useEffect(() => {
    // Immediately reset native scroll
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also tell Lenis to jump to top — this is what actually
    // controls scrolling when Lenis smooth-scroll is active.
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Retry after a frame in case Lenis wasn't ready yet
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [lenis]);

  return null;
}
