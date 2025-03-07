// // CommentList.tsx
// import React from "react";
// import classNames from "classnames/bind";
// import styles from "./CommentList.module.scss";
// import { ThemedTypography } from "../Typography/ThemedTypography";
// import type { DeliverableTheme } from "../DeliverablesView/types";
// // import { Comment } from "../DeliverableCard/types";

// const cx = classNames.bind(styles);

// interface CommentListProps {
//   comments: Comment[];
//   theme?: DeliverableTheme;
// }

// export const CommentList: React.FC<CommentListProps> = ({
//   comments,
//   theme = { type: "light" },
// }) => {
//   if (!comments?.length) {
//     return (
//       <div className={cx("comments", `comments--theme-${theme.type}`)}>
//         <div className={cx("comments__empty")}>
//           <ThemedTypography variant="p2" color="secondary" theme={theme}>
//             No comments yet. Be the first to comment!
//           </ThemedTypography>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cx("comments", `comments--theme-${theme.type}`)}>
//       {comments.map((comment) => (
//         <div key={comment.id} className={cx("comments__item")}>
//           <img
//             src={comment.author.avatar}
//             alt={comment.author.name}
//             className={cx("comments__avatar")}
//           />
//           <div className={cx("comments__content")}>
//             <div className={cx("comments__header")}>
//               <ThemedTypography
//                 variant="p2"
//                 className={cx("comments__author")}
//                 theme={theme}
//               >
//                 {comment.author.name}
//               </ThemedTypography>
//               <ThemedTypography
//                 variant="p3"
//                 className={cx("comments__time")}
//                 color="secondary"
//                 theme={theme}
//               >
//                 {/* {formatDateTime(comment.createdAt)} */}
//                 {comment.createdAt}
//               </ThemedTypography>
//             </div>
//             <ThemedTypography
//               variant="p2"
//               className={cx("comments__text")}
//               color="secondary"
//               theme={theme}
//             >
//               {comment.text}
//             </ThemedTypography>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CommentList;
