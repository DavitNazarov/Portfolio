import { useEffect, useState } from "react";
import { SECTIONS } from "@/layout/constants/sections";

/**
 * Tracks the section currently under the reading line.
 *
 * Uses one IntersectionObserver rather than a scroll listener: the previous
 * version ran on every scroll event with no throttling and read `offsetTop` for
 * all six sections, forcing a synchronous reflow on every frame Lenis produced.
 */
export function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Sections are observed in document order, so the last visible one is
        // the furthest down the page — that is the one being read.
        const current = SECTIONS.filter(({ id }) => visible.has(id)).pop();
        if (current) setActive(current.id);
      },
      // A band across the upper-middle of the viewport acts as the reading line.
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}
