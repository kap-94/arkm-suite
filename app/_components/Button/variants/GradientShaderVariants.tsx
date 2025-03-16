import React from "react";

export const renderGradientShaderVariantElements = (
  variant: string,
  cx: Function
) => {
  // Elementos comunes para todas las variantes de gradient-shader
  const commonElements = (
    <>
      <span className={cx("glass-shine")} />
      <span className={cx("button__glow")} />
    </>
  );

  // Elementos específicos para cada variante
  switch (variant) {
    case "gradient-neon":
      return (
        <>
          {commonElements}
          <span className={cx("neon-glow-effect")} />
        </>
      );

    case "gradient-aurora":
      return (
        <>
          {commonElements}
          <span className={cx("aurora-wave", "aurora-wave--1")} />
          <span className={cx("aurora-wave", "aurora-wave--2")} />
          <span className={cx("aurora-wave", "aurora-wave--3")} />
        </>
      );

    case "gradient-cyber":
      return (
        <>
          {commonElements}
          <span className={cx("cyber-glitch")} />
        </>
      );

    case "gradient-holographic":
      return (
        <>
          {commonElements}
          <span className={cx("holo-shine")} />
          <span className={cx("holo-refraction")} />
        </>
      );

    case "gradient-crystal":
      return (
        <>
          {commonElements}
          <span className={cx("crystal-refract", "crystal-refract--1")} />
          <span className={cx("crystal-refract", "crystal-refract--2")} />
        </>
      );

    default:
      return commonElements;
  }
};
