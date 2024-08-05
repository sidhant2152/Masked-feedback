import { z } from "zod";
export const messageSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username cannot be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  content: z
    .string({ required_error: "Content must be at least 10 characters." })
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message should be at most 300 characters"),
});

export type messageSchemaType = z.infer<typeof messageSchema>;
