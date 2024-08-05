import { ApiResponse } from "@/types/apiResponse";
import VerificationEmail from "../../emails/verificationEmail";
import { Resend } from "resend";

export default async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  console.log("🚀 ~ verificationCode:", verificationCode);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ validationCode: verificationCode, username }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: "Failed to send verification email",
      error,
    };
  }
}
