"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,             // Lower value = smoother/looser scroll (default ~0.1)
        duration: 1.5,          // Adjust scroll duration
        smoothWheel: true,      // Ensure mouse wheel is smoothed
      }}
    >
      {/* React 19 types mismatch with older react-lenis types */}
      {children as any}
    </ReactLenis>
  );
}
