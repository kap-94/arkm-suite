"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import { User as UserIcon, ChevronDown } from "lucide-react";
import { UpdateProfileForm } from "../../../../_components/UpdateProfileForm";
import { PageHeader } from "../../../../_components/PageHeader";
import { ModernPattern } from "../../../../_components/ModernPattern";
import { ThemedDropdown } from "../../../../_components/Dropdown";
// import { ProfileImage } from "../../../../_components/ProfileImage";
import { useSettings } from "../../../../_context/SettingsContext";
import { ThemedTypography } from "../../../../_components/Typography/ThemedTypography";
import { PatternTheme } from "../../../../_components/ModernPattern/types";
import { ProfileDictionary } from "../../../../_types/dictionary/profile.types";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

interface Option {
  value: string;
  label: React.ReactNode;
}

const countryOptions: Option[] = [
  { value: "MX", label: "México" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "ES", label: "Spain" },
  { value: "BR", label: "Brazil" },
].map((option) => ({
  value: option.value,
  label: (
    <div className={cx("profile-page__dropdown-option")}>
      <img
        src={`https://flagcdn.com/${option.value.toLowerCase()}.svg`}
        alt={`${option.label} flag`}
        className={cx("profile-page__dropdown-flag")}
      />
      <ThemedTypography
        variant="p2"
        className={cx("profile-page__dropdown-label")}
      >
        {option.label}
      </ThemedTypography>
    </div>
  ),
}));

export interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
  profileImage: string;
}

interface ProfileClientProps {
  dictionary: ProfileDictionary;
  user: UserProfile;
}

export function ProfileClient({ dictionary, user }: ProfileClientProps) {
  const { theme } = useSettings();
  const [selectedCountry, setSelectedCountry] = useState<Option>(() => {
    const country = countryOptions.find(
      (opt) => opt.value === user.nationality
    );
    return country || countryOptions[0];
  });

  const patternTheme: PatternTheme = {
    type: theme,
    variant: "neuralNetwork",
    colors: {
      dark: {
        background: "transparent",
        primary: "rgba(255, 255, 255, 0.15)",
        secondary: "rgba(255, 255, 255, 0.25)",
        accent: "rgba(255, 255, 255, 0.2)",
      },
      light: {
        background: "transparent",
        primary: "rgba(0, 0, 0, 0.15)",
        secondary: "rgba(0, 0, 0, 0.25)",
        accent: "rgba(0, 0, 0, 0.2)",
      },
    },
    opacity: {
      lines: 0.3,
      particles: 0.4,
      connections: 0.3,
      shapes: 0.35,
    },
  };

  const handleProfileUpdate = async (updatedUser: any) => {
    try {
      console.log("Updating user profile:", updatedUser);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error(dictionary.errors.profileUpdate);
    }
  };

  const handleImageChange = async (file: File) => {
    try {
      console.log("Updating profile image:", file);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw new Error(dictionary.errors.imageUpdate);
    }
  };

  const handleCountryChange = (option: Option) => {
    setSelectedCountry(option);
    const updatedUser = {
      ...user,
      nationality: option.value,
      countryFlag: `https://flagcdn.com/${option.value.toLowerCase()}.svg`,
    };
    handleProfileUpdate(updatedUser);
  };

  return (
    <div className={cx("profile-page", `profile-page--theme-${theme}`)}>
      <div className={cx("profile-page__pattern-background")}>
        <ModernPattern theme={patternTheme} />
      </div>

      <PageHeader
        icon={<UserIcon size={22} />}
        title={dictionary.header.title}
        subtitle={dictionary.header.subtitle}
        theme={{ type: theme }}
      />

      <div className={cx("profile-page__container")}>
        <div className={cx("profile-page__form-container")}>
          {/* <ProfileImage
            imageUrl={user.profileImage}
            theme={{ type: theme }}
            onImageChange={handleImageChange}
            user={user}
            dictionary={dictionary}
          /> */}

          <UpdateProfileForm
            user={user}
            theme={{ type: theme }}
            onSubmit={handleProfileUpdate}
            dictionary={dictionary}
          >
            <ThemedDropdown
              label={dictionary.form.fields.nationality.label}
              id="nationality"
              options={countryOptions}
              selected={selectedCountry}
              onSelectedChange={handleCountryChange}
              className={cx("profile-page__dropdown")}
              theme={{ type: theme }}
              closeOnScroll
              disabled
              icon={
                <ChevronDown
                  color="rgba(241, 228, 228, 0.4)"
                  className={cx("profile-page__dropdown-icon")}
                />
              }
            />
          </UpdateProfileForm>
        </div>
      </div>
    </div>
  );
}
