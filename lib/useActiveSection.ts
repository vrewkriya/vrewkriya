"use client";
import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[], defaultSection: string = "") {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Trigger when the section crosses the vertical center of the screen
      { rootMargin: "-50% 0px -50% 0px" } 
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
