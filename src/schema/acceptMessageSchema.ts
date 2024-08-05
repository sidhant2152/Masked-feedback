import { z } from "zod";

export const acceptMessageSchema = z.object({
  acceptMessage: z.boolean(),
});

export type AcceptMessageSchemaType = z.infer<typeof acceptMessageSchema>;
