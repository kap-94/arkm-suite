import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: HTMLElement, options?: any) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, y: 30 },
    {
      duration: 1,
      autoAlpha: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        ...options,
      },
    }
  );
};

export const rotateIn = (element: HTMLElement, options?: any) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, rotation: -10 },
    {
      duration: 1.5,
      autoAlpha: 1,
      rotation: 0,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        scrub: 1,
        ...options,
      },
    }
  );
};

export const scaleUp = (element: HTMLElement, options?: any) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, scale: 0.8 },
    {
      duration: 1.3,
      autoAlpha: 1,
      scale: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 70%",
        scrub: 1,
        ...options,
      },
    }
  );
};

export const slideIn = (element: HTMLElement, options?: any) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, x: -50 },
    {
      duration: 1.4,
      autoAlpha: 1,
      x: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 65%",
        scrub: 1,
        ...options,
      },
    }
  );
};

export const blurToFocus = (element: HTMLElement, options?: any) => {
  gsap.fromTo(
    element,
    { autoAlpha: 0, filter: "blur(4px)" },
    {
      duration: 1.5,
      autoAlpha: 1,
      filter: "blur(0px)",
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
        ...options,
      },
    }
  );
};

export const slideFromSide = (element: HTMLElement, options?: any) => {
  const defaultOptions = {
    duration: 1,
    start: "top center+=100",
    toggleActions: "play none none reverse",
    x: -100, // Default slide from left
    ...options,
  };

  gsap.fromTo(
    element,
    { autoAlpha: 0, x: defaultOptions.x },
    {
      duration: defaultOptions.duration,
      autoAlpha: 1,
      x: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: defaultOptions.start,
        toggleActions: defaultOptions.toggleActions,
      },
    }
  );
};
