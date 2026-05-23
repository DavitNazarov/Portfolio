import { useEffect, useState } from "react";
import { SECTIONS } from "@/layout/constants/sections";

export function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.scrollY + window.innerHeight * 0.4;
      let currentId = SECTIONS[0].id;

      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= triggerLine) currentId = id;
      }

      setActive(currentId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return active;
}
