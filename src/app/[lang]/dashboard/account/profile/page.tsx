// page.tsx
import React from "react";
import { Metadata } from "next";
import classNames from "classnames/bind";
import {
  ProfileTheme,
  UpdateProfileForm,
} from "@/components/UpdateProfileForm";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./page.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { SettingsIcon } from "lucide-react";

export interface User {
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
}

export interface UpdateProfilePageProps {
  user: User;
}

export const mockUser: User = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  nationality: "US",
  nationalID: "123-45-6789",
  countryFlag: "https://flagcdn.com/us.svg",
};

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Update profile | YourApp",
  description: "Update your profile information",
};

export default function UpdateProfilePage() {
  const theme: ProfileTheme = { type: "dark" };

  const handleProfileUpdate = async (updatedUser: User) => {
    "use server";
    // Simulate API call
    console.log("Updating user profile:", updatedUser);
    // Here you would typically make an API call or database update
  };

  return (
    <div className={cx("profile-page", `profile-page--theme-${theme.type}`)}>
      <PageHeader
        icon={<SettingsIcon size={22} />}
        title={"Profile"}
        subtitle="Customize your account settings and preferences"
        theme={theme}
      />
      <div className={cx("profile-page__container")}>
        <ThemedTypography
          variant="h3"
          align="center"
          className={cx("profile-page__title")}
        >
          Update your profile
        </ThemedTypography>

        <ThemedTypography
          variant="p1"
          align="center"
          className={cx("profile-page__description")}
        >
          Keep your profile information up to date to ensure the best experience
          with our services.
        </ThemedTypography>

        <div className={cx("profile-page__form-container")}>
          <UpdateProfileForm
            user={mockUser}
            theme={theme}
            onSubmit={handleProfileUpdate}
          >
            <select
              name="nationality"
              id="nationality"
              className={cx("profile-page__select")}
              defaultValue={mockUser.nationality}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="FR">France</option>
              {/* Add more countries as needed */}
            </select>
          </UpdateProfileForm>
        </div>
      </div>
    </div>
  );
}
