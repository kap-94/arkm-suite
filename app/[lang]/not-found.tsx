import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./not-found.module.scss";
import Typography from "../_components/Typography";
import { Button } from "../_components/Button";

const cx = classNames.bind(styles);

export default function NotFound() {
  return (
    <div className={cx("not-found")}>
      <h1 className={cx("title")}>Not Found</h1>
      <h1 className={cx("title-blur")}>Not Found</h1>

      <Typography className={cx("subtitle")}>
        The page you are looking for could not be found.
      </Typography>

      <Link href="/" passHref>
        <Button variant="secondary">Return Home</Button>
      </Link>
    </div>
  );
}
