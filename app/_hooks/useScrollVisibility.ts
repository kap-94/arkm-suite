"use client";

import { useEffect, useRef } from "react";

export function useScrollVisibility() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeout) clearTimeout(timeout);

        if (entry.isIntersecting) {
          timeout = setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.visibility = "visible";
          }, 50);
        }
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return ref;
}
