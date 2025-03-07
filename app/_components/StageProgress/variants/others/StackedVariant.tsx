// import React from "react";
// import classNames from "classnames/bind";
// import styles from "../StageProgress.module.scss";
// import { VariantProps } from "../types";
// import { getStageColor, isStageComplete } from "../utils";
// import { getProgressBarStyle } from "../gradients";

// const cx = classNames.bind(styles);

// export const StackedVariant: React.FC<VariantProps> = ({
//   progress,
//   stages,
//   size = "default",
//   gradientVariant = "progressive",
// }) => {
//   const stagesWithColors = stages.map((stage, index) => ({
//     ...stage,
//     color: stage.color || getStageColor(stage, index),
//   }));

//   const gradientStyle = getProgressBarStyle(
//     stagesWithColors,
//     progress,
//     gradientVariant
//   );
//   const backgroundGradient =
//     gradientStyle.background?.toString().replace("90deg", "to top") ||
//     `linear-gradient(to top, ${stagesWithColors
//       .map((stage) => stage.color)
//       .join(", ")})`;

//   return (
//     <div
//       className={cx("stage-progress__track", "stage-progress__track--stacked", {
//         "stage-progress__track--small": size === "small",
//       })}
//     >
//       <div className={cx("stage-progress__stacked-container")}>
//         {stagesWithColors.map((stage, index) => {
//           const isComplete = isStageComplete(stage, progress);

//           return (
//             <div
//               key={stage.name}
//               className={cx("stage-progress__stacked-segment", {
//                 "stage-progress__stacked-segment--active": isComplete,
//               })}
//             >
//               <div
//                 className={cx("stage-progress__stacked-bar")}
//                 style={{ backgroundColor: stage.color }}
//               >
//                 <div className={cx("stage-progress__stacked-content")}>
//                   <span className={cx("stage-progress__stacked-name")}>
//                     {stage.name}
//                   </span>
//                   <span className={cx("stage-progress__stacked-threshold")}>
//                     {stage.threshold}%
//                   </span>
//                 </div>
//               </div>
//               {index < stages.length - 1 && (
//                 <div className={cx("stage-progress__stacked-connector")} />
//               )}
//             </div>
//           );
//         })}
//         <div
//           className={cx("stage-progress__stacked-fill")}
//           style={{
//             height: `${progress}%`,
//             background: backgroundGradient,
//           }}
//         />
//       </div>
//     </div>
//   );
// };
