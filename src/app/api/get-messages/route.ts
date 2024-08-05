import dbConnect from "@/lib/dbConnect";
import { getUser } from "@/lib/getUser";
import MessageModel from "@/models/Message";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";
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
