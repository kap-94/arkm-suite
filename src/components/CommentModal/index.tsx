// CommentModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./CommentModal.module.scss";
import { ThemedTypography } from "../Typography/ThemedTypography";
import type { DeliverableTheme } from "../DeliverablesView/types";

const cx = classNames.bind(styles);

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  theme?: DeliverableTheme;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme = { type: "light" },
}) => {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
      onClose();
    }
  };

  return (
    <div className={cx("modal", `modal--theme-${theme.type}`)}>
      <div className={cx("modal__overlay")}>
        <div className={cx("modal__backdrop")} onClick={onClose} />

        <div className={cx("modal__container")}>
          <div className={cx("modal__header")}>
            <ThemedTypography
              variant="h5"
              className={cx("modal__title")}
              theme={theme}
            >
              Add Comment
            </ThemedTypography>
            <button onClick={onClose} className={cx("modal__close")}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={cx("modal__content")}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className={cx("modal__textarea")}
              aria-label="Comment text"
            />

            <div className={cx("modal__actions")}>
              <button
                type="button"
                onClick={onClose}
                className={cx("modal__button", "modal__button--secondary")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!comment.trim()}
                className={cx("modal__button", "modal__button--primary")}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
