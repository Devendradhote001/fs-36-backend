import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email",
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  return await transporter.sendMail({
    from: process.env.SMTP_USER_EMAIL,
    to,
    subject,
    html,
  });
};
