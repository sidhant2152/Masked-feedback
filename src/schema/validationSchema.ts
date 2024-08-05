import { z } from "zod";

export const validationSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username is required")
    .max(20, "Username cannot be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  code: z.string().length(6, "Verification Code must be of 6 characters"),
});

export type validationSchemaType = z.infer<typeof validationSchema>;
