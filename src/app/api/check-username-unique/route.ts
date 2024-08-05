import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
export const dynamic = "force-dynamic";
const usernameValidationSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username cannot be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");
export async function GET(request: Request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    const parsedUsername = usernameValidationSchema.safeParse(username);
    if (!parsedUsername.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(parsedUsername.error).toString(),
        },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ username, isVerified: true });
    if (user) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log("🚀 ~ GET ~ error:", error);
    return Response.json({
      success: false,
      message: error?.message || "Something went wrong while checking username",
    });
  }
}
