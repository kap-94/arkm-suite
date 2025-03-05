// import React from "react";
// import { Link, ArrowUpRight } from "lucide-react";
// import classNames from "classnames/bind";
// import { DeliverableTheme } from "../../types";
// import { ThemedTypography } from "@/components/Typography/ThemedTypography";
// import styles from "./DependencyCard.module.scss";

// const cx = classNames.bind(styles);

// export interface DependencyCardProps {
//   id: string;
//   name: string;
//   status: "completed" | "in-progress";
//   onClick?: () => void;
//   theme?: DeliverableTheme;
// }

// export const DependencyCard: React.FC<DependencyCardProps> = ({
//   name,
//   status,
//   onClick,
//   theme = { type: "light" },
// }) => {
//   return (
//     <div className={cx("dependency", `dependency--theme-${theme.type}`)}>
//       <div className={cx("dependency__info")}>
//         <div
//           className={cx("dependency__icon-wrapper", {
//             "dependency__icon-wrapper--completed": status === "completed",
//           })}
//         >
//           <Link
//             className={cx("dependency__icon", {
//               "dependency__icon--completed": status === "completed",
//               "dependency__icon--in-progress": status === "in-progress",
//             })}
//           />
//         </div>
//         <ThemedTypography
//           variant="p2"
//           fontWeight={400}
//           className={cx("dependency__text")}
//         >
//           {name}
//         </ThemedTypography>
//       </div>

//       {/* <button
//         onClick={onClick}
//         className={cx("dependency__action")}
//         aria-label={`View details for ${name}`}
//       >
//         <ArrowUpRight className={cx("dependency__icon")} />
//       </button> */}
//     </div>
//   );
// };

// export default DependencyCard;
