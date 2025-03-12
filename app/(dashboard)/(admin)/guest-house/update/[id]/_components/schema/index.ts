import { z } from "zod";
import { ContactType } from "../types";

export const guestHouseSchema = z.object({
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
  contacts: z.array(
    z.object({
      type: z.nativeEnum(ContactType).default(ContactType.PHONE),
      value: z.string().min(3, {
        message: "Contact value must be at least 3 characters long.",
      }),
    })
  ),
  rooms: z.array(z.coerce.number()).optional(),
  images: z.array(z.string()).optional(),
});

export type GuestHouse = z.infer<typeof guestHouseSchema>;
