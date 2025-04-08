"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Extender la interfaz Window
declare global {
  interface Window {
    __GSAP_INITIALIZED__?: boolean;
    __GSAP_CTX?: gsap.Context;
  }
}

if (typeof window !== "undefined") {
  if (!window.__GSAP_INITIALIZED__) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    window.__GSAP_CTX = gsap.context(() => {});
    window.__GSAP_INITIALIZED__ = true;
  }
}

export { gsap, ScrollTrigger };
