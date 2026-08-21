import { z } from "zod";

export const emailSchema = z.string().trim().pipe(z.email());

export const newsletterSubscribeSchema = z.object({
  email: emailSchema,
});
