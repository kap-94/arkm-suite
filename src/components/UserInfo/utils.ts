// src/app/components/UserInfo/utils/userInfoUtils.ts
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
