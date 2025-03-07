// app/[lang]/settings/SettingsSkeleton.tsx
import classNames from "classnames/bind";
import styles from "../page.module.scss";

const cx = classNames.bind(styles);

export function SettingsSkeleton() {
  return (
    <div className={cx("settings__content")}>
      {[1].map((index) => (
        <div key={index} className={cx("settings__section")}>
          <div className={cx("settings__section-header")}>
            <div
              className={cx(
                "settings__skeleton-title",
                "settings__skeleton-animation"
              )}
            />
            <div
              className={cx(
                "settings__skeleton-description",
                "settings__skeleton-animation"
              )}
            />
          </div>
          <div className={cx("settings__section-content")}>
            <div
              className={cx(
                "settings__skeleton-toggle",
                "settings__skeleton-animation"
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
