"use server";

import { sendEmailAction } from "@/app/_actions/sendEmail";
import { FormValues } from "../_components/ProjectForm/types";

class EmailService {
  async sendProjectEmail(formValues: FormValues): Promise<void> {
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    try {
      await sendEmailAction(formData);
    } catch (error) {
      console.error("Error sending project email:", error);
      throw error;
    }
  }
}

export async function sendProjectEmail(formValues: FormValues): Promise<void> {
  const service = new EmailService();
  await service.sendProjectEmail(formValues);
}
