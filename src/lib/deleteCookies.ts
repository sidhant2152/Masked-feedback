"use server";

import { cookies } from "next/headers";

export async function deleteCookies() {
  const cookieStore = cookies();
  cookieStore.delete("token");
}
