// ProfileImage.tsx
"use client";

import React, { useState, useRef } from "react";
import classNames from "classnames/bind";
import { Camera } from "lucide-react";
import { ProfileImageTheme, ProfileImageProps } from "./types";
import { ThemedTypography } from "../Typography/ThemedTypography";

import styles from "./ProfileImage.module.scss";

const cx = classNames.bind(styles);

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const defaultTheme: ProfileImageTheme = {
  type: "light",
  colors: {
    label: "#64748B",
    border: "rgba(0, 0, 0, 0.12)",
    overlayBackground: "rgba(0, 0, 0, 0.7)",
    overlayText: "#FFFFFF",
    shadow: "0 4px 24px -8px rgba(0, 0, 0, 0.1)",
    text: "#1F2937",
    secondaryText: "#6B7280",
  },
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
  theme = defaultTheme,
  onImageChange,
  user,
  dictionary,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initials = getInitials(user.fullName);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange?.(file);
    }
  };

  return (
    <div
      className={cx("profile-image", `profile-image--theme-${theme.type}`)}
      style={
        theme.type === "custom"
          ? ({
              "--profile-image-label": theme.colors?.label,
              "--profile-image-border": theme.colors?.border,
              "--profile-image-overlay-bg": theme.colors?.overlayBackground,
              "--profile-image-overlay-text": theme.colors?.overlayText,
              "--profile-image-shadow": theme.colors?.shadow,
              "--profile-image-text": theme.colors?.text,
              "--profile-image-secondary-text": theme.colors?.secondaryText,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={cx("profile-image__left")}>
        <div
          className={cx("profile-image__container")}
          onClick={() => fileInputRef.current?.click()}
        >
          <figure className={cx("profile-image__figure")}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className={cx("profile-image__photo")}
              />
            ) : (
              <div className={cx("profile-image__initials")}>
                <ThemedTypography
                  variant="h3"
                  color="secondary"
                  className={cx("profile-image__initials-text")}
                >
                  {initials}
                </ThemedTypography>
              </div>
            )}
            <figcaption className={cx("profile-image__overlay")}>
              <Camera size={22} strokeWidth={1.5} />
              <ThemedTypography variant="p3">
                {dictionary.image.upload.label}
              </ThemedTypography>
            </figcaption>
          </figure>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className={cx("profile-image__input")}
        />
      </div>

      <div className={cx("profile-image__info")}>
        <ThemedTypography
          variant="h3"
          fontWeight={400}
          color="secondary"
          className={cx("profile-image__name")}
        >
          {user.fullName}
        </ThemedTypography>

        <ThemedTypography
          variant="p2"
          color="tertiary"
          className={cx("profile-image__role")}
        >
          {user.role}
        </ThemedTypography>
      </div>
    </div>
  );
};

export default ProfileImage;
