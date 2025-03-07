import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
