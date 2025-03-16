"use client";
import { useEffect, useState } from "react";

const useScrollActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the screen
      let currentActive = "";

      sectionIds.forEach((sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition <= sectionTop + sectionHeight
          ) {
            currentActive = sectionId;
          }
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on component mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
};

export default useScrollActiveSection;
