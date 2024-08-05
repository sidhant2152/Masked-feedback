import dbConnect from "@/lib/dbConnect";
import { getUser } from "@/lib/getUser";
import { revalidateCustomPath } from "@/lib/revalidatePath";
import MessageModel from "@/models/Message";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    await dbConnect();
    const user = await getUser();
    if (!user) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    const message = await MessageModel.findByIdAndDelete(params.messageId);

    const updateResult = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          messages: new mongoose.Types.ObjectId(params.messageId),
        },
      },
      { new: true }
    );
    console.log("🚀 ~ updateResult:", updateResult);
    await revalidateCustomPath("/dashboard");
    if (!message || !updateResult) {
      return Response.json(
        { message: "Cannot delete message", success: false },
        { status: 404 }
      );
    }
    return Response.json(
      { message: "Message deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}
