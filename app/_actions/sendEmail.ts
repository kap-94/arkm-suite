"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

// Updated schema to include optional message field
const formValuesSchema = z.object({
  type: z.string(),
  customType: z.string().optional(),
  budget: z.string(),
  timeline: z.string(),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredContact: z.string(),
  message: z.string().optional(), // Added message field
});

export async function sendEmailAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = formValuesSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid form data");
  }
  const formValues = result.data;

  // Determine if this is a contact form submission or a project form submission
  const isContactForm = formValues.type === "contact-form";
  const emailSubject = isContactForm
    ? `New Message from ${formValues.companyName}`
    : `New Project Received - ${formValues.companyName}`;

  // Create the HTML content based on the form type
  let htmlContent = "";

  if (isContactForm) {
    // HTML content for simple contact form
    htmlContent = `
      <h2 style="font-family: Arial, sans-serif; color: #4158d0;">
        New Message from ${formValues.companyName}
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr style="background-color: #6366f1; color: white;">
          <th style="padding: 8px; border: 1px solid #ddd;">Field</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Value</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.companyName
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.email
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Message</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.message || ""
          }</td>
        </tr>
      </table>
    `;
  } else {
    // Original HTML content for project form
    htmlContent = `
      <h2 style="font-family: Arial, sans-serif; color: #4158d0;">
        New Project Received - ${formValues.companyName}
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr style="background-color: #6366f1; color: white;">
          <th style="padding: 8px; border: 1px solid #ddd;">Field</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Value</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Type of Project</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.type
          }</td>
        </tr>
        ${
          formValues.type === "other"
            ? `<tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Custom Type</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formValues.customType}</td>
              </tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Budget Range</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.budget
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Timeline</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.timeline
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Company Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.companyName
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.email
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Phone</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.phone || ""
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Preferred Contact Method</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${
            formValues.preferredContact
          }</td>
        </tr>
      </table>
      <p style="font-family: Arial, sans-serif; margin-top: 20px; color: #4f46e5;">
        Please analyze the information above and create a project development plan based on the requirements provided.
      </p>
    `;
  }

  // Create text content based on form type
  let textContent = "";

  if (isContactForm) {
    textContent = `
New Message from ${formValues.companyName}
-----------------------
Name: ${formValues.companyName}
Email: ${formValues.email}
Message: ${formValues.message || ""}
    `;
  } else {
    textContent = `
New Project Received - ${formValues.companyName}
-----------------------
Type of Project: ${formValues.type}
${formValues.type === "other" ? `Custom Type: ${formValues.customType}\n` : ""}
Budget Range: ${formValues.budget}
Timeline: ${formValues.timeline}
Company Name: ${formValues.companyName}
Email: ${formValues.email}
Phone: ${formValues.phone || ""}
Preferred Contact Method: ${formValues.preferredContact}

Please analyze the information above and create a project development plan based on the requirements provided.
    `;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM!,
    to: process.env.MAIL_TO!,
    subject: emailSubject,
    text: textContent,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
  return info;
}
