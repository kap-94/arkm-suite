// // variants/DiagonalVariant.tsx
// import React from "react";
// import classNames from "classnames/bind";
// import styles from "../StageProgress.module.scss";
// import { VariantProps } from "../types";

// const cx = classNames.bind(styles);

// export const DiagonalVariant: React.FC<VariantProps> = ({
//   progress,
//   stages,
// }) => (
//   <div
//     className={cx("stage-progress__track", "stage-progress__track--diagonal")}
//   >
//     <div className={cx("stage-progress__diagonal-container")}>
//       {stages.map((stage) => (
//         <div
//           key={stage.name}
//           className={cx("stage-progress__diagonal-segment", {
//             "stage-progress__diagonal-segment--active":
//               progress >= stage.threshold,
//           })}
//           style={{
//             backgroundColor: stage.color,
//             clipPath: `polygon(0 0, 100% 25%, 100% 75%, 0 100%)`,
//           }}
//         >
//           <div className={cx("stage-progress__diagonal-content")}>
//             <span className={cx("stage-progress__diagonal-name")}>
//               {stage.name}
//             </span>
//             <span className={cx("stage-progress__diagonal-threshold")}>
//               {stage.threshold}%
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );
