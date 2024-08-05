"use server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { JwtPayload } from "@/types/jwtPayload";
export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const secret = process.env.JWT_SECRET!;
  if (!token) return null;
  try {
    // const user = <JwtPayload>(
    //   jwt.verify(token, process.env.JWT_SECRET as string)
    // );
    const { payload: user } = await jose.jwtVerify<JwtPayload>(
      token,
      new TextEncoder().encode(secret)
    );
    return user;
  } catch (error) {
    throw error;
  }
}
