import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { signupSchema } from "@/schema/signUpSchema";
import { fromZodError } from "zod-validation-error";
import { hash } from "bcryptjs";
import { sendVerificationEmailNodemailer } from "@/helpers/sendVerificationEmailNodemailer";
import { otpTemplate } from "@/helpers/VerificationNodemailer";
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json(
        { success: false, message: fromZodError(parsedBody.error).toString() },
        { status: 400 }
      );
    }
    const verifiedUser = await UserModel.findOne({
      email: parsedBody.data.email,
      isVerified: true,
    });
    if (verifiedUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    const notVerifiedUser = await UserModel.findOne({
      email: parsedBody.data.email,
    });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (notVerifiedUser) {
      if (notVerifiedUser.isVerified) {
        return Response.json(
          { success: false, message: "User already exists" },
          { status: 400 }
        );
      } else {
        notVerifiedUser.password = await hash(parsedBody.data.password, 10);
        notVerifiedUser.verifyCode = verifyCode;
        notVerifiedUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await notVerifiedUser.save();
      }
    } else {
      const newUser = await UserModel.create({
        email: parsedBody.data.email,
        password: await hash(parsedBody.data.password, 10),
        username: parsedBody.data.username,
        verifyCode: verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 3600000),
        isVerified: false,
        isAcceptingMessages: true,
      });
    }

    // sending verification mail
    const emailResponse = await sendVerificationEmailNodemailer(
      parsedBody.data.email,
      otpTemplate(verifyCode, parsedBody.data.username)
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("🚀 ~ Error in signup route:", error);
    return Response.json(
      { success: false, message: error.message || "Error while signing up" },
      { status: 500 }
    );
  }
}
