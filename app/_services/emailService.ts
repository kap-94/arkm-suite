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

  async sendContactEmail(contactData: ContactFormData): Promise<void> {
    const formData = new FormData();

    // Map contact form fields to the project form fields
    formData.append("type", "contact-form");
    formData.append("customType", "Simple Contact Message");
    formData.append("budget", "N/A");
    formData.append("timeline", "N/A");
    formData.append("companyName", contactData.name);
    formData.append("email", contactData.email);
    formData.append("phone", "");
    formData.append("preferredContact", "email");
    formData.append("message", contactData.message);

    try {
      await sendEmailAction(formData);
    } catch (error) {
      console.error("Error sending contact email:", error);
      throw error;
    }
  }
}

// Type definition for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Instance of EmailService to reuse
const emailService = new EmailService();

// Export functions for external use
export async function sendProjectEmail(formValues: FormValues): Promise<void> {
  await emailService.sendProjectEmail(formValues);
}

export async function sendContactEmail(
  contactData: ContactFormData
): Promise<void> {
  await emailService.sendContactEmail(contactData);
}
