import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./SearchCard.module.scss";
import { SearchResult } from "./types";
import { ThemedTypography } from "../Typography/ThemedTypography";

const cx = classNames.bind(styles);

interface SearchCardProps extends SearchResult {
  theme?: "light" | "dark" | "custom";
}

export const SearchCard: FC<SearchCardProps> = ({
  title,
  excerpt,
  slug,
  type,
  theme = "light",
}) => {
  return (
    <article className={cx("search-card", `search-card--${theme}`)}>
      <div className={cx("search-card__header")}>
        <ThemedTypography
          variant="h5"
          color="primary"
          className={cx("search-card__title")}
        >
          {title}
        </ThemedTypography>
        <ThemedTypography
          variant="p2"
          // fontWeight={400}
          color="primary"
          textTransform="capitalize"
          className={cx("search-card__type")}
        >
          {type}
        </ThemedTypography>
      </div>

      <ThemedTypography
        color="secondary"
        className={cx("search-card__excerpt")}
      >
        {excerpt}
      </ThemedTypography>
    </article>
  );
};
