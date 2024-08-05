import dbConnect from "@/lib/dbConnect";
import { getUser } from "@/lib/getUser";
import UserModel from "@/models/User";
import { acceptMessageSchema } from "@/schema/acceptMessageSchema";
import { fromZodError } from "zod-validation-error";

// Toggle accept messages
export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "You are not logged in!",
        },
        { status: 404 }
      );
    }
    await dbConnect();
    const body = await request.json();
    const parsedBody = acceptMessageSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json({
        success: false,
        message: fromZodError(parsedBody.error).toString(),
      });
    }
    const { acceptMessage } = parsedBody.data;
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { isAcceptingMessages: acceptMessage },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log("🚀 ~ error:", error);
    return Response.json(
      {
        success: false,
        message: error?.message || "Failed to update message acceptance status",
      },
      { status: 500 }
    );
  }
}

// get status for user accepting messages
export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return Response.json(
        { success: false, message: "You are not logged in" },
        { status: 401 }
      );
    }

    await dbConnect();
    const existingUser = await UserModel.findById(user._id);
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User message acceptance status fetched successfully",
        acceptMessage: existingUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log("🚀 ~ GET ~ error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while getting message acceptance status",
      },
      { status: 500 }
    );
  }
}
