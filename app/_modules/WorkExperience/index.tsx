// WorkExperienceSection.tsx
import React from "react";
import { WorkExperienceDictionary } from "@/app/_types/dictionary/home.types";
import ClientWorkExperience from "./ClientWorkExperience";

interface WorkExperienceSectionProps {
  dictionary: WorkExperienceDictionary;
  customAnchorId?: string;
}

// Server Component
export default function WorkExperienceSection({
  dictionary,
  customAnchorId,
}: WorkExperienceSectionProps) {
  return (
    <ClientWorkExperience
      dictionary={dictionary}
      customAnchorId={customAnchorId}
    />
  );
}
