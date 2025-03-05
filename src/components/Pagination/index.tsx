import React, { FC, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { ThemedTypography } from "../Typography/ThemedTypography";

const cx = classNames.bind(styles);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark" | "custom";
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  theme = "light",
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        // Show first 5 pages + ellipsis + last page
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page + ellipsis + last 5 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    } else {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={cx("pagination", `pagination--${theme}`)}>
      {/* Previous button */}
      <button
        className={cx("pagination__button", "pagination__button--nav")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ThemedTypography
          variant="p3"
          className={cx("pagination__button-text")}
        >
          Previous
        </ThemedTypography>
      </button>

      {/* Page numbers */}
      <div className={cx("pagination__numbers")}>
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className={cx("pagination__ellipsis")}>
                <ThemedTypography
                  variant="p3"
                  className={cx("pagination__button-text")}
                >
                  ...
                </ThemedTypography>
              </span>
            ) : (
              <button
                className={cx("pagination__button", {
                  "pagination__button--active": page === currentPage,
                })}
                onClick={() => typeof page === "number" && onPageChange(page)}
              >
                <ThemedTypography
                  variant="p3"
                  className={cx("pagination__button-text", {
                    "pagination__button-text--active": page === currentPage,
                  })}
                >
                  {page}
                </ThemedTypography>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next button */}
      <button
        className={cx("pagination__button", "pagination__button--nav")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ThemedTypography
          variant="p3"
          className={cx("pagination__button-text")}
        >
          Next
        </ThemedTypography>
      </button>
    </div>
  );
};

export default Pagination;
