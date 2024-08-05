import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { validationSchema } from "@/schema/validationSchema";
import { fromZodError } from "zod-validation-error";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const parsedBody = validationSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(parsedBody.error).toString(),
        },
        { status: 400 }
      );
    }
    const { username, code } = parsedBody.data;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const codeMatch = code === user.verifyCode;
    const codeValid = new Date(user.verifyCodeExpiry) > new Date(Date.now());
    if (!codeMatch) {
      return Response.json(
        {
          success: false,
          message: "Verification code is invalid",
        },
        { status: 400 }
      );
    } else if (!codeValid) {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired, Please Signup again",
        },
        { status: 400 }
      );
    }
    user.isVerified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User verified successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({
      success: false,
      message: error?.message || "Something went wrong while verifying user",
    });
  }
}
