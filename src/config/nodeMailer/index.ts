import nodemailer from "nodemailer";
import { getEmailTemplateForOtp } from "../emailTemplate/emialTemplate";


interface EmailConfig {
  to: string;
  subject: string;
  otp: string;
}


const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER_PROD,
      pass: process.env.EMAIL_PASSWORD_PROD,
    },
  });
};


export const sendOtpEmail = async ({
  to,
  subject,
  otp,
}: EmailConfig): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"UD Food Waste Tracker" <${process.env.EMAIL_USER_PROD}>`,
      to,
      subject,
      html: getEmailTemplateForOtp(otp),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

