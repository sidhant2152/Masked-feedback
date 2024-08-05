"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCustomPath(path: string) {
  revalidatePath(path, "page");
  return;
}
