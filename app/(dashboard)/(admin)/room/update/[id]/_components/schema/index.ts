import { z } from "zod";


export const roomSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long." }),
  region: z
    .string()
    .min(1, { message: "Region must be at least 3 characters long." }),
  description: z.string().optional(),
  hasParking: z.boolean().default(false),
  isPetFriendly: z.boolean().default(false),

  rooms: z.array(z.coerce.number()).optional(),
  images: z.array(z.string()).optional(),
});

export type room = z.infer<typeof roomSchema>;