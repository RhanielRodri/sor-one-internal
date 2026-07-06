"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STAGGER_STEP_MS = 80;
const STAGGER_MAX_MS = 480;

export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const groups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-group]"),
    );

    groups.forEach((group) => {
      const groupElements = Array.from(
        group.querySelectorAll<HTMLElement>(".reveal"),
      );
      groupElements.forEach((el, index) => {
        const delay = Math.min(index * STAGGER_STEP_MS, STAGGER_MAX_MS);
        el.style.setProperty("--reveal-delay", `${delay}ms`);
      });
    });

    elements.forEach((el) => el.classList.add("armed"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
