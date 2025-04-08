// types.ts
export type HamburgerVariant = "slide" | "morph" | "slideFade" | "triple";

export interface HamburgerTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    primary?: string;
    secondary?: string;
    background?: string;
    hover?: string;
  };
}

export interface HamburgerButtonProps {
  onClick: () => void;
  variant?: HamburgerVariant;
  className?: string;
  isOpen?: boolean;
  theme?: HamburgerTheme;
}
