import { ApiResponse } from "@/types/apiResponse";
import nodemailer from "nodemailer";
export async function sendVerificationEmailNodemailer(
  email: string,
  body: string
): Promise<ApiResponse> {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: "demo.user14625@gmail.com",
      to: `${email}`,
      subject: `Masked Feedback Verification email`,
      html: `${body}`,
    });
    console.log("🚀 ~ info:", info);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: "Failed to send verification email",
      error,
    };
  }
}
