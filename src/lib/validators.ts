import { z } from "zod";

export type UserNameFormValues = z.infer<typeof userNameSchema>;

export const userNameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain letters,number, and underscores"
    ),
});
