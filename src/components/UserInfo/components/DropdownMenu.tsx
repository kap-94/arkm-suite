// src/app/components/UserInfo/components/DropdownMenu/index.tsx
import classnames from "classnames/bind";
import { User, Settings, LogOut } from "lucide-react";
import styles from "../UserInfo.module.scss";

const cx = classnames.bind(styles);

interface DropdownMenuProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSignOut?: () => void;
  className?: string;
}

export const DropdownMenu = ({
  onProfileClick,
  onSettingsClick,
  onSignOut,
  className,
}: DropdownMenuProps) => {
  return (
    <div className={cx("user-info__dropdown-menu", className)}>
      <button
        className={cx("user-info__dropdown-item")}
        onClick={onProfileClick}
      >
        <User size={16} />
        <span>View Profile</span>
      </button>

      <div className={cx("user-info__dropdown-divider")} />
      <button className={cx("user-info__dropdown-item")} onClick={onSignOut}>
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};
