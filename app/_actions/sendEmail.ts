"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const formValuesSchema = z.object({
  type: z.string(),
  customType: z.string().optional(),
  budget: z.string(),
  timeline: z.string(),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredContact: z.string(),
});

export async function sendEmailAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = formValuesSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Datos del formulario inválidos");
  }
  const formValues = result.data;

  // Contenido HTML del correo con formato profesional e inclusión del nombre de la empresa
  const htmlContent = `
    <h2 style="font-family: Arial, sans-serif; color: #4158d0;">
      Nuevo Proyecto Recibido - ${formValues.companyName}
    </h2>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <tr style="background-color: #6366f1; color: white;">
        <th style="padding: 8px; border: 1px solid #ddd;">Campo</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Valor</th>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Tipo de Proyecto</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          formValues.type
        }</td>
      </tr>
      ${
        formValues.type === "other"
          ? `<tr>
               <td style="padding: 8px; border: 1px solid #ddd;">Tipo Personalizado</td>
               <td style="padding: 8px; border: 1px solid #ddd;">${formValues.customType}</td>
             </tr>`
          : ""
      }
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Rango de Presupuesto</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          formValues.budget
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Plazo</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          formValues.timeline
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Nombre de la Empresa</td>
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
        <td style="padding: 8px; border: 1px solid #ddd;">Teléfono</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          formValues.phone || ""
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Método de Contacto Preferido</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          formValues.preferredContact
        }</td>
      </tr>
    </table>
    <p style="font-family: Arial, sans-serif; margin-top: 20px; color: #4f46e5;">
      Por favor, analiza la información anterior y crea un plan de desarrollo de proyecto basado en los requerimientos proporcionados. Agradecemos tu atención y esperamos tu propuesta profesional.
    </p>
  `;

  const textContent = `
Nuevo Proyecto Recibido - ${formValues.companyName}
-----------------------
Tipo de Proyecto: ${formValues.type}
${
  formValues.type === "other"
    ? `Tipo Personalizado: ${formValues.customType}\n`
    : ""
}
Rango de Presupuesto: ${formValues.budget}
Plazo: ${formValues.timeline}
Nombre de la Empresa: ${formValues.companyName}
Email: ${formValues.email}
Teléfono: ${formValues.phone || ""}
Método de Contacto Preferido: ${formValues.preferredContact}

Por favor, analiza la información anterior y crea un plan de desarrollo de proyecto basado en los requerimientos proporcionados. Agradecemos tu atención y esperamos tu propuesta profesional.
  `;

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
    subject: `Nuevo Proyecto Recibido - ${formValues.companyName}`,
    text: textContent,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Correo enviado:", info.messageId);
  return info;
}
