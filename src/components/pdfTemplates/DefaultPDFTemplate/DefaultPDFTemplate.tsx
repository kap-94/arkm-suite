// DefaultPDFTemplate/index.tsx
import React, { FC } from "react";
import classnames from "classnames/bind";
import styles from "./DefaultPDFTemplate.module.scss";

export interface DefaultPDFTemplateProps {
  data: {
    content: React.ReactNode;
    styles?: Record<string, string>;
  };
}

const cx = classnames.bind(styles);

export const DefaultPDFTemplate: FC<DefaultPDFTemplateProps> = ({ data }) => {
  const { content, styles: customStyles = {} } = data;

  return (
    <div className={cx("default-pdf__container")} style={customStyles}>
      {content}
    </div>
  );
};

export default DefaultPDFTemplate;
