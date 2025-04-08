"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/app/_lib/gsap-init";
import { isHighPerformanceDevice } from "./utils";

interface AnimationRefs {
  sectionRef: React.RefObject<HTMLElement>;
  gridRef: React.RefObject<HTMLDivElement>;
  headerRef: React.RefObject<HTMLDivElement>;
  stepsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const useMethodologyAnimation = (
  cx: (className: string, obj?: Record<string, boolean>) => string,
  refs: AnimationRefs
) => {
  const { sectionRef, gridRef, headerRef, stepsRefs } = refs;

  // Flags to prevent duplicate animations and manage states
  const animationExecutedRef = useRef(false);
  const positionsFixedRef = useRef(false);

  // Detect reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Function to set initial states using GSAP
  const setInitialStates = useCallback(() => {
    if (prefersReducedMotion.current) return;

    // 1. Grid and header
    if (gridRef.current) {
      gsap.set(gridRef.current, {
        opacity: 0,
        scale: 1.05,
        force3D: true,
        visibility: "visible",
      });
    }

    if (headerRef.current) {
      gsap.set(headerRef.current, {
        opacity: 0,
        y: 25,
        force3D: true,
        visibility: "visible",
      });
    }

    // 2. Steps and their contents
    stepsRefs.current.forEach((step) => {
      if (!step) return;

      // The step itself
      gsap.set(step, {
        opacity: 0,
        y: 30,
        force3D: true,
        visibility: "visible",
      });

      // Step contents
      const iconSvg = step.querySelector(
        `.${cx("methodology__step-icon")} svg`
      );
      const title = step.querySelector(`.${cx("methodology__step-title")}`);
      const description = step.querySelector(
        `.${cx("methodology__step-description")}`
      );

      if (iconSvg) {
        gsap.set(iconSvg, {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          force3D: true,
          visibility: "visible",
        });
      }

      if (title) {
        gsap.set(title, {
          opacity: 0,
          y: 10,
          force3D: true,
          visibility: "visible",
        });
      }

      if (description) {
        gsap.set(description, {
          opacity: 0,
          y: 10,
          force3D: true,
          visibility: "visible",
        });
      }
    });
  }, [cx, gridRef, headerRef, stepsRefs]);

  // Fix final positions after animation completes
  const fixFinalPositions = useCallback(() => {
    if (!sectionRef.current || positionsFixedRef.current) return;

    // Mark positions as fixed
    positionsFixedRef.current = true;

    // Apply animation-completed class to main section
    if (sectionRef.current) {
      sectionRef.current.classList.add(cx("completed-section"));
    }
  }, [cx, sectionRef]);

  // Create animation sequence
  const createAnimation = useCallback(() => {
    if (!sectionRef.current || animationExecutedRef.current) return;

    // Prevent multiple configurations
    animationExecutedRef.current = true;

    // Check for reduced motion preference
    if (prefersReducedMotion.current) {
      // Make everything visible without animation
      fixFinalPositions();
      return;
    }

    // Set initial states before animation
    setInitialStates();

    // Create GSAP context
    const ctx = gsap.context(() => {
      // Prepare elements
      const stepElements = stepsRefs.current.filter(Boolean);

      // Group selectors by type for animation
      const elements = {
        grid: gridRef.current,
        header: headerRef.current,
        steps: stepElements,
        iconSvgs: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-icon")} svg`)
          )
          .filter(Boolean),
        titles: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-title")}`)
          )
          .filter(Boolean),
        descriptions: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-description")}`)
          )
          .filter(Boolean),
      };

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          duration: 0.65,
          ease: "power2.out",
        },
        onComplete: () => {
          // Fix final positions once when animation completes
          fixFinalPositions();

          // Remove ScrollTrigger to free resources
          const triggers = ScrollTrigger.getAll().filter(
            (trigger) => trigger.vars.trigger === sectionRef.current
          );
          triggers.forEach((trigger) => trigger.kill());
        },
      });

      // Timeline with adjusted timings
      tl
        // Grid first (background)
        .fromTo(
          elements.grid,
          { opacity: 0, scale: 1.05 },
          { opacity: 0.35, scale: 1, duration: 0.8 },
          0
        )
        // Header synchronized with grid
        .fromTo(
          elements.header,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1
        )
        // Animate steps
        .fromTo(
          elements.steps,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: {
              each: 0.08,
              from: "start",
            },
            duration: 0.7,
          },
          0.3
        )
        // Icons
        .fromTo(
          elements.iconSvgs,
          { opacity: 0, scale: 0.8, rotation: -5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.5
        )
        // Titles and descriptions
        .fromTo(
          elements.titles,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.55
        )
        .fromTo(
          elements.descriptions,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.6
        );

      // Enhanced shimmer effect
      const isHighEnd = isHighPerformanceDevice() && window.innerWidth > 768;

      if (isHighEnd) {
        const maxShimmers = window.innerWidth > 1200 ? stepElements.length : 3;

        for (let i = 0; i < Math.min(maxShimmers, stepElements.length); i++) {
          const step = stepElements[i];
          if (!step) continue;

          const stepContent = step.querySelector(
            `.${cx("methodology__step-content")}`
          );
          if (!stepContent) continue;

          // Reduced delay
          const delay = 1200 + i * 80;

          setTimeout(() => {
            if (!step.isConnected) return;

            const shimmer = document.createElement("div");
            shimmer.className = cx("methodology__step-shimmer");
            stepContent.appendChild(shimmer);

            gsap.fromTo(
              shimmer,
              { x: "-100%", opacity: 0.3 },
              {
                x: "100%",
                opacity: 0,
                duration: 0.9,
                ease: "power1.inOut",
                onComplete: () => {
                  if (shimmer.parentNode) {
                    shimmer.parentNode.removeChild(shimmer);
                  }
                },
              }
            );
          }, delay);
        }
      }
    }, sectionRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [
    cx,
    setInitialStates,
    fixFinalPositions,
    gridRef,
    headerRef,
    sectionRef,
    stepsRefs,
  ]);

  // Create callback ref for steps
  const setStepRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      stepsRefs.current[index] = el;
    },
    [stepsRefs]
  );

  // Set up intersection observer
  useEffect(() => {
    if (typeof window === "undefined" || animationExecutedRef.current) return;

    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animationExecutedRef.current) {
        requestAnimationFrame(createAnimation);
        observer.disconnect();
      }
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [createAnimation, sectionRef]);

  return { setStepRef };
};
