"use client";
import { useEffect } from "react";

export function RevealManager() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!els.length) return;

    // If IntersectionObserver isn't supported, just show all
    if (typeof window === 'undefined' || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
