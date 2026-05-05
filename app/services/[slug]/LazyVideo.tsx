"use client";

import React, { useEffect, useRef } from "react";

interface LazyVideoProps {
  readonly src: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export default function LazyVideo({ src, className, style }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.error("Video play failed:", err));
        } else {
          video.pause();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
        ...style,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
