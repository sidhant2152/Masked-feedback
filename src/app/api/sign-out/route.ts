export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
export function GET(request: Request) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");
    return Response.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while logging out",
      },
      { status: 500 }
    );
  }
}
