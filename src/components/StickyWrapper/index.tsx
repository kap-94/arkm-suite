import React, { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface StickyWrapperProps {
  children: ReactNode;
  className?: string;
  stickyOffset?: number;
  zIndex?: number;
  stickyDirection?: "top" | "bottom" | "left" | "right"; // Nueva prop para configurar la dirección
}

const StickyWrapper: React.FC<StickyWrapperProps> = ({
  children,
  className,
  stickyOffset = 72,
  zIndex = 99,
  stickyDirection = "top", // Valor por defecto: "top"
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const stickyElement = stickyRef.current;
    const container = containerRef.current;
    const placeholder = placeholderRef.current;

    if (!sentinel || !stickyElement || !container || !placeholder) return;

    const updateDimensions = (): void => {
      if (container && stickyElement && placeholder) {
        const containerRect = container.getBoundingClientRect();
        const stickyRect = stickyElement.getBoundingClientRect();
        const width = containerRect.width;

        stickyElement.style.width = `${width}px`;
        placeholder.style.height = `${stickyRect.height}px`;
      }
    };

    const setStickyState = (shouldBeSticky: boolean): void => {
      if (!stickyElement || !placeholder || !container) return;

      const containerRect = container.getBoundingClientRect();

      if (shouldBeSticky) {
        stickyElement.style.position = "fixed";
        stickyElement.style.zIndex = `${zIndex}`;
        placeholder.style.display = "block";

        // Ajustar la posición según la dirección configurada
        switch (stickyDirection) {
          case "top":
            stickyElement.style.top = `${stickyOffset}px`;
            stickyElement.style.left = `${containerRect.left}px`;
            break;
          case "bottom":
            stickyElement.style.bottom = `${stickyOffset}px`;
            stickyElement.style.left = `${containerRect.left}px`;
            break;
          case "left":
            stickyElement.style.left = `${stickyOffset}px`;
            stickyElement.style.top = `${containerRect.top}px`;
            break;
          case "right":
            stickyElement.style.right = `${stickyOffset}px`;
            stickyElement.style.top = `${containerRect.top}px`;
            break;
          default:
            stickyElement.style.top = `${stickyOffset}px`;
            stickyElement.style.left = `${containerRect.left}px`;
        }
      } else {
        stickyElement.style.position = "relative";
        stickyElement.style.top = "0";
        stickyElement.style.left = "0";
        stickyElement.style.bottom = "auto";
        stickyElement.style.right = "auto";
        placeholder.style.display = "none";
      }
    };

    // Initial dimensions set
    updateDimensions();

    // Handle resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    resizeObserver.observe(stickyElement);

    // Configurar el rootMargin según la dirección
    let rootMargin = "";
    switch (stickyDirection) {
      case "top":
        rootMargin = `-${stickyOffset}px 0px 0px 0px`;
        break;
      case "bottom":
        rootMargin = `0px 0px -${stickyOffset}px 0px`;
        break;
      case "left":
        rootMargin = `0px 0px 0px -${stickyOffset}px`;
        break;
      case "right":
        rootMargin = `0px -${stickyOffset}px 0px 0px`;
        break;
      default:
        rootMargin = `-${stickyOffset}px 0px 0px 0px`;
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setStickyState(!entry.isIntersecting);
      },
      {
        threshold: [0],
        rootMargin: rootMargin,
      }
    );

    intersectionObserver.observe(sentinel);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [stickyOffset, zIndex, stickyDirection]);

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
  };

  const placeholderStyle: CSSProperties = {
    display: "none",
    width: "100%",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div ref={sentinelRef} />
      <div ref={placeholderRef} style={placeholderStyle} />
      <div ref={stickyRef} className={className}>
        {children}
      </div>
    </div>
  );
};

export default StickyWrapper;
