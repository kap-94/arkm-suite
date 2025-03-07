// components/PDFWrappers/DOMWrapper.tsx
import React from "react";

interface DOMWrapperProps {
  content: HTMLElement;
}

export const DOMWrapper: React.FC<DOMWrapperProps> = ({ content }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(content.cloneNode(true));
    }
  }, [content]);

  return <div ref={containerRef} />;
};
