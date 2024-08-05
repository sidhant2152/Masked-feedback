import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username cannot be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Enter valid email"),
});

export type signupType = z.infer<typeof signupSchema>;
