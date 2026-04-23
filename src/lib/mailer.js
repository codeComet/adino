import nodemailer from "nodemailer";

/**
 * Reusable nodemailer transporter.
 * Configure via environment variables in .env.local
 */
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export const FROM = process.env.SMTP_FROM || process.env.SMTP_USER;
export const CONTACT_TO = process.env.MAIL_TO_CONTACT;
export const NEWSLETTER_TO = process.env.MAIL_TO_NEWSLETTER;
