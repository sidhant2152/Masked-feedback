import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/models/Message";
import UserModel from "@/models/User";
import { messageSchema } from "@/schema/messageSchema";
import { revalidatePath } from "next/cache";
import { fromZodError } from "zod-validation-error";
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
    const message = await MessageModel.create({
      content,
      createdAt: new Date(),
      user: user._id,
    });

    user.messages.push(message._id);
    await user.save();
    revalidatePath("/dashboard", "page");
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      { message: "Something went wrong while sending message", success: false },
      { status: 500 }
    );
  }
}
