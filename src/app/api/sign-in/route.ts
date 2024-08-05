import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { loginSchema } from "@/schema/loginSchema";
import { nanoid } from "nanoid";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";
import { SignJWT } from "jose";
export async function POST(request: Request) {
  const secret = process.env.JWT_SECRET!;
  try {
    await dbConnect();
    const body = await request.json();
    const parsedCredentials = loginSchema.safeParse(body);
    if (parsedCredentials.error) {
      return Response.json(
        {
          success: false,
          message: fromZodError(parsedCredentials.error).toString(),
        },
        { status: 401 }
      );
    }
    const { username, password } = parsedCredentials.data;

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
    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User not verified",
        },
        { status: 403 }
      );
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }
    const jwtPayload = {
      _id: user.id,
      username: user.username,
      email: user.email,
      isAcceptingMessages: user.isAcceptingMessages,
      isVerified: user.isVerified,
    };
    const token = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("10days")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json(
      { success: true, data: user, message: "User logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while signing in",
      },
      { status: 500 }
    );
  }
}
