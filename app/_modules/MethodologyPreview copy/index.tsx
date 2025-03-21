// import React from "react";
// import classNames from "classnames/bind";
// import { Typography } from "@/app/_components/Typography";
// import styles from "./MethodologyPreview.module.scss";

// const cx = classNames.bind(styles);

// interface MethodologyStep {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }

// interface MethodologyPreviewProps {
//   dictionary?: any;
// }

// export const MethodologyPreview = ({ dictionary }: MethodologyPreviewProps) => {
//   const methodologySteps: MethodologyStep[] = [
//     {
//       title: "Research",
//       description:
//         "Through detailed analysis and client dialogues, we uncover your company's essence, message, and unique market positioning to build a solid foundation for your digital presence.",
//       icon: <ResearchIcon />,
//     },
//     {
//       title: "Visual Direction",
//       description:
//         "We craft your brand identity through creative exploration of colors, graphics, animations, and UI patterns, weaving individual elements into a cohesive visual language that resonates with your audience.",
//       icon: <VisualDirectionIcon />,
//     },
//     {
//       title: "UI Design",
//       description:
//         "Our team develops a comprehensive design system and meticulously crafts each project page following its guidelines, refining every section, illustration, and animation until the mockup achieves perfection.",
//       icon: <UIDesignIcon />,
//     },
//     {
//       title: "Development",
//       description:
//         "We implement your design with pixel-perfect precision using JAM stack within the React ecosystem, delivering a high-performance, secure, and maintainable website that functions flawlessly across all devices.",
//       icon: <DevelopmentIcon />,
//     },
//     {
//       title: "Launch",
//       description:
//         "ARKM supports you throughout the deployment process, offering expert guidance on hosting platforms, CI/CD pipelines, content migration, and strategic rollout strategies to ensure a smooth transition.",
//       icon: <LaunchIcon />,
//     },
//     {
//       title: "Maintenance",
//       description:
//         "Our partnership continues after launch with comprehensive support to keep your site cutting-edge, provide social media assets, expand your component library as needed, and promptly address any technical issues.",
//       icon: <MaintenanceIcon />,
//     },
//   ];

//   // Split steps into two rows
//   const firstRowSteps = methodologySteps.slice(0, 3);
//   const secondRowSteps = methodologySteps.slice(3);

//   return (
//     <section className={cx("methodology")}>
//       <div className={cx("methodology__backdrop")} aria-hidden="true">
//         <div
//           className={cx(
//             "methodology__grid-line",
//             "methodology__grid-line--horizontal"
//           )}
//         ></div>
//         <div
//           className={cx(
//             "methodology__grid-line",
//             "methodology__grid-line--vertical"
//           )}
//         ></div>
//       </div>

//       <div className={cx("methodology__container")}>
//         <div className={cx("methodology__header")}>
//           <Typography
//             variant="h2"
//             color="primary"
//             fontFamily="sofia"
//             fontWeight={400}
//             theme="dark"
//             className={cx("methodology__title")}
//             align="center"
//           >
//             {dictionary?.title || "Our Development Methodology"}
//           </Typography>
//           <Typography
//             variant="p1"
//             color="tertiary"
//             theme="dark"
//             fontWeight={300}
//             fontFamily="sofia"
//             className={cx("methodology__subtitle")}
//           >
//             {dictionary?.subtitle ||
//               "At ARKM, we follow a strategic, six-step methodology that transforms your digital vision into an exceptional web experience with precision and artistry."}
//           </Typography>
//         </div>

//         <div className={cx("methodology__process")}>
//           {/* First row of steps */}
//           <div className={cx("methodology__row")}>
//             {firstRowSteps.map((step, index) => (
//               <React.Fragment key={`first-row-${index}`}>
//                 <div className={cx("methodology__step")}>
//                   <div className={cx("methodology__step-content")}>
//                     <div className={cx("methodology__step-number")}>
//                       <span>{index + 1}</span>
//                     </div>
//                     <div className={cx("methodology__step-icon")}>
//                       {step.icon}
//                     </div>
//                     <Typography
//                       variant="h4"
//                       color="primary"
//                       fontFamily="sofia"
//                       fontWeight={500}
//                       theme="dark"
//                       className={cx("methodology__step-title")}
//                     >
//                       {step.title}
//                     </Typography>
//                     <Typography
//                       variant="p2"
//                       color="tertiary"
//                       theme="dark"
//                       fontWeight={300}
//                       fontFamily="sofia"
//                       className={cx("methodology__step-description")}
//                     >
//                       {step.description}
//                     </Typography>
//                   </div>
//                 </div>
//                 {index < firstRowSteps.length - 1 && (
//                   <div className={cx("methodology__connector-wrapper")}>
//                     <ConnectorArrow />
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Center vertical connector */}
//           <div className={cx("methodology__vertical-connector")}>
//             <VerticalConnector />
//           </div>

//           {/* Second row of steps (reversed direction) */}
//           <div className={cx("methodology__row", "methodology__row--reverse")}>
//             {secondRowSteps.map((step, index) => (
//               <React.Fragment key={`second-row-${index}`}>
//                 <div className={cx("methodology__step")}>
//                   <div className={cx("methodology__step-content")}>
//                     <div className={cx("methodology__step-number")}>
//                       <span>{index + 4}</span>
//                     </div>
//                     <div className={cx("methodology__step-icon")}>
//                       {step.icon}
//                     </div>
//                     <Typography
//                       variant="h4"
//                       color="primary"
//                       fontFamily="sofia"
//                       fontWeight={500}
//                       theme="dark"
//                       className={cx("methodology__step-title")}
//                     >
//                       {step.title}
//                     </Typography>
//                     <Typography
//                       variant="p2"
//                       color="tertiary"
//                       theme="dark"
//                       fontWeight={300}
//                       fontFamily="sofia"
//                       className={cx("methodology__step-description")}
//                     >
//                       {step.description}
//                     </Typography>
//                   </div>
//                 </div>
//                 {index < secondRowSteps.length - 1 && (
//                   <div
//                     className={cx(
//                       "methodology__connector-wrapper",
//                       "methodology__connector-wrapper--reverse"
//                     )}
//                   >
//                     <ConnectorArrow />
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MethodologyPreview;
