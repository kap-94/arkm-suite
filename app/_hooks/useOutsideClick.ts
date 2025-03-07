// import { useEffect, useRef, RefObject } from "react";

// export function useOutsideClick(
//   handler: () => void,
//   listenCapturing = true
// ): RefObject<any> {
//   const ref = useRef<any>(null);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         handler();
//       }
//     }

//     document.addEventListener("click", handleClick, listenCapturing);

//     return () => {
//       document.removeEventListener("click", handleClick, listenCapturing);
//     };
//   }, [handler, listenCapturing]);

//   return ref;
// }

import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
  excludeRefs: React.RefObject<HTMLElement>[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || !(event.target instanceof Node)) {
        return;
      }

      // Check if click is inside any of the excluded refs
      const isInsideExcluded = excludeRefs.some((excludeRef) =>
        excludeRef.current?.contains(event.target as Node)
      );

      if (!ref.current.contains(event.target) && !isInsideExcluded) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback, excludeRefs]);

  return ref;
}
