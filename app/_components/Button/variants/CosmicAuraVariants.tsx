// src/components/Button/variants/CosmicAuraVariants.tsx

export const renderCosmicAuraVariantElements = (
  variant: string,
  cx: Function
) => {
  switch (variant) {
    case "cosmic-aura":
      return (
        <>
          <span className={cx("button__starfield")} />
          <span className={cx("button__aura")} />
          <span className={cx("button__ripple")} />
        </>
      );

    case "cosmic-aura-outlined":
      return (
        <>
          <span className={cx("button__inner-border")} />
          <span className={cx("button__outline-glow")} />
        </>
      );

    case "cosmic-aura-glow":
      return (
        <>
          <span className={cx("button__outer-glow")} />
          <span className={cx("button__energy-waves")} />
        </>
      );

    case "cosmic-aura-gradient":
      return (
        <>
          <span className={cx("button__gradient-border")} />
          <span className={cx("button__gradient-shimmer")} />
        </>
      );

    case "cosmic-aura-nebula":
      return (
        <>
          <span className={cx("button__nebula")} />
          <span className={cx("button__stars")} />
          <span className={cx("button__dust")} />
        </>
      );

    case "cosmic-aura-minimal":
      return (
        <>
          <span className={cx("button__minimal-border")} />
          <span className={cx("button__minimal-glow")} />
        </>
      );

    default:
      return null;
  }
};
