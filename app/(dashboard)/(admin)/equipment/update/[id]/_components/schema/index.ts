import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name.",
  }),
  icon: z.string().min(1, {
    message: "Please upload an image.",
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});
