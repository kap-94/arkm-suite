"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import { AnimatedTextProps } from "../types/header.types";
import { textAnimationVariants, getAnimationDelay } from "../utils";
import styles from "../styles/AnimatedText.module.scss";

const cx = classNames.bind(styles);

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "", // Default value
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize text processing to avoid unnecessary calculations
  const characters = useMemo(() => {
    if (typeof text !== "string") return [];
    return text.split("");
  }, [text]);

  if (!characters.length) {
    return <span className={cx("animated", className)}>&nbsp;</span>;
  }

  return (
    <span
      className={cx("animated", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cx("animated__text")}>
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className={cx("animated__char", {
              "animated__char--space": char === " ",
            })}
            variants={textAnimationVariants}
            animate={isHovered ? "hovered" : "normal"}
            custom={index}
            transition={{
              ...textAnimationVariants[isHovered ? "hovered" : "normal"]
                .transition,
              delay: isHovered ? getAnimationDelay(index) : 0,
            }}
          >
            {char || "\u00A0"}
          </motion.span>
        ))}
      </span>
    </span>
  );
};
