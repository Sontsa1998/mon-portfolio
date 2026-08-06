import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(5000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
