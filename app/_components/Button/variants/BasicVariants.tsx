// src/components/Button/variants/BasicVariants.tsx
// import React from "react";

// export const renderBasicVariantElements = (variant: string, cx: Function) => {
//   if (variant === "gradient") {
//     return <span className={cx("button__glow")} />;
//   }

//   return null;
// };
// src/components/Button/variants/BasicVariants.tsx
import React from "react";

export const renderBasicVariantElements = (variant: string, cx: Function) => {
  if (variant === "gradient") {
    return (
      <>
        <span className={cx("glass-shine")} />
        <span className={cx("button__glow")} />
      </>
    );
  }

  return null;
};
