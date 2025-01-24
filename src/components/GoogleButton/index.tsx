import { forwardRef, useState } from "react";
import { signIn } from "next-auth/react";
import classNames from "classnames/bind";
import { Loader } from "lucide-react";
import { Typography } from "../Typography";
import styles from "./GoogleButton.module.scss";

const cx = classNames.bind(styles);

export interface GoogleButtonProps {
  variant?: "default" | "outline" | "flat";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  callbackUrl?: string;
  children?: React.ReactNode;
}

export const GoogleButton = forwardRef<HTMLButtonElement, GoogleButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      radius = "md",
      className,
      disabled = false,
      isLoading: externalLoading = false,
      callbackUrl = "/dashboard",
      children,
    },
    ref
  ) => {
    const [isLocalLoading, setIsLocalLoading] = useState(false);
    const isLoading = externalLoading || isLocalLoading;

    const handleGoogleSignIn = async () => {
      try {
        setIsLocalLoading(true);
        await signIn("google", { callbackUrl });
      } catch (error) {
        console.error("Error signing in with Google:", error);
      } finally {
        setIsLocalLoading(false);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleGoogleSignIn}
        className={cx(
          "google-button",
          `google-button--${variant}`,
          `google-button--${size}`,
          `google-button--radius-${radius}`,
          {
            "google-button--disabled": disabled,
            "google-button--loading": isLoading,
          },
          className
        )}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <Loader className={cx("google-button__spinner")} size={20} />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
            >
              <path
                fill="#4285F4"
                d="M45.12 24.52c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.07 5.07-4.42 6.62v5.52h7.15c4.16-3.83 6.55-9.47 6.55-16.15z"
              />
              <path
                fill="#34A853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.15-5.52c-1.97 1.32-4.49 2.1-7.41 2.1-5.7 0-10.54-3.85-12.23-9.04H4.36v5.69C8.08 41.37 15.4 46 24 46z"
              />
              <path
                fill="#FBBC05"
                d="M11.62 28.21c-.44-1.32-.69-2.72-.69-4.17s.25-2.85.69-4.17V14.08H4.36C2.85 17.1 2 20.45 2 24s.85 6.9 2.36 9.92l7.26-5.71z"
              />
              <path
                fill="#EA4335"
                d="M24 9.62c3.23 0 6.12 1.11 8.41 3.28l6.31-6.31C34.91 1.81 29.43 0 24 0 15.4 0 8.08 4.63 4.36 11.48l7.26 5.71C13.46 13.47 18.3 9.62 24 9.62z"
              />
            </svg>
            <Typography
              variant="p1"
              className={cx("google-button__text")}
              fontWeight={500}
              noWrap
            >
              {children || "Continue with Google"}
            </Typography>
          </>
        )}
      </button>
    );
  }
);

GoogleButton.displayName = "GoogleButton";
