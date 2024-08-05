import dbConnect from "@/lib/dbConnect";
import { getUser } from "@/lib/getUser";
import mongoose from "mongoose";
import MessageModel from "@/models/Message";
import UserModel from "@/models/User";
import { messageSchema } from "@/schema/messageSchema";
import { fromZodError } from "zod-validation-error";
import { revalidatePath } from "next/cache";
import { revalidateCustomPath } from "@/lib/revalidatePath";
export async function GET(request: Request) {
  try {
    await dbConnect();
    const user = await getUser();
    // console.log("🚀 ~ GET ~ user:", user);
    if (!user) {
      return Response.json(
        { success: false, message: "You are not logged in" },
        { status: 401 }
      );
    }
    const userId = new mongoose.Types.ObjectId(user._id);

    const userMessages = await MessageModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        { message: "No message received yet! ", success: false },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Successfully fetched messages",
        messages: userMessages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // console.log("🚀 ~ GET ~ error:", error);
    return Response.json({
      success: false,
      message: "Something went wrong while fetching messages",
    });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const parsedBody = messageSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json(
        {
          success: false,
          message: fromZodError(parsedBody.error).toString(),
        },
        { status: 400 }
      );
    }
    const { username, content } = parsedBody.data;
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
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 400 }
      );
    }
    await revalidateCustomPath("/dashboard");
    const message = await MessageModel.create({
      content,
      createdAt: new Date(),
      user: user._id,
    });

    user.messages.push(message._id);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      { message: "Something went wrong while sending message", success: false },
      { status: 500 }
    );
  }
}
