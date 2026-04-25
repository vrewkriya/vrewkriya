"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible', 'in');
    }
  });
};

export default function ClientReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver;

    // Adding slight setTimeout helps ensure the DOM has updated after routing
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

      reveals.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}
