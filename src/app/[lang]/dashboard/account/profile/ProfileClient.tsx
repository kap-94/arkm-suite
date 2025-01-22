"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import { User as UserIcon, ChevronDown } from "lucide-react";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { PageHeader } from "@/components/PageHeader";
import { ModernPattern } from "@/components/ModernPattern";
import { Dropdown } from "@/components/Dropdown";
import { ProfileImage } from "@/components/ProfileImage";
import { useSettings } from "@/context/SettingsContext";
import type { CommonDictionary } from "@/types/dictionary";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { PatternTheme } from "@/components/ModernPattern/types";
import { User } from "@/types/User.types";

import styles from "./page.module.scss";
import { ProfileDictionary } from "@/types/dictionary/profile.types";

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

export const mockUser: User = {
  fullName: "Marc Vega",
  email: "john.doe@example.com",
  role: "Product Owner",
  nationality: "US",
  nationalID: "123-45-6789",
  countryFlag: "https://flagcdn.com/us.svg",
  profileImage: "/default-avatar.png",
};

interface ProfileClientProps {
  dictionary: {
    profile: ProfileDictionary;
    common: CommonDictionary;
  };
}

export function ProfileClient({ dictionary }: ProfileClientProps) {
  const { theme } = useSettings();
  const [selectedCountry, setSelectedCountry] = useState<Option>(() => {
    const country = countryOptions.find(
      (opt) => opt.value === mockUser.nationality
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

  const handleProfileUpdate = async (updatedUser: User) => {
    try {
      console.log("Updating user profile:", updatedUser);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error(dictionary.common.error);
    }
  };

  const handleImageChange = async (file: File) => {
    try {
      console.log("Updating profile image:", file);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw new Error(dictionary.profile.errors.imageUpdate);
    }
  };

  const handleCountryChange = (option: Option) => {
    setSelectedCountry(option);
    const updatedUser = {
      ...mockUser,
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
        title={dictionary.profile.header.title}
        subtitle={dictionary.profile.header.subtitle}
        theme={{ type: theme }}
      />

      <div className={cx("profile-page__container")}>
        <div className={cx("profile-page__form-container")}>
          <ProfileImage
            imageUrl={mockUser.profileImage}
            theme={{ type: theme }}
            onImageChange={handleImageChange}
            user={mockUser}
            dictionary={dictionary.profile}
          />

          <UpdateProfileForm
            user={mockUser}
            theme={{ type: theme }}
            onSubmit={handleProfileUpdate}
            dictionary={dictionary.profile}
          >
            <Dropdown
              label={dictionary.profile.form.fields.nationality.label}
              id="nationality"
              options={countryOptions}
              selected={selectedCountry}
              onSelectedChange={handleCountryChange}
              className={cx("profile-page__dropdown")}
              theme={{ type: theme }}
              closeOnScroll
              disabled
              icon={
                <ChevronDown className={cx("profile-page__dropdown-icon")} />
              }
            />
          </UpdateProfileForm>
        </div>
      </div>
    </div>
  );
}
