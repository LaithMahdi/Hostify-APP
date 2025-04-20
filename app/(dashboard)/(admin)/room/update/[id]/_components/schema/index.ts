import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z
    .string()
    .min(1, { message: "Room number is required." })
    .refine((val) => {
      parseInt(val) > 0,
        {
          message: "Room number must be a positive number.",
        };
    }),
  type: z.string().min(1, { message: "Room type is required." }),
  pricePerNight: z
    .string()
    .min(1, { message: "Price per night is required." })
    .refine((val) => {
      parseFloat(val) > 0,
        {
          message: "Price per night must be a positive number.",
        };
    }),
  status: z.string().min(1, { message: "Status is required." }),
  capacity: z.number().min(1, { message: "Capacity must be at least 1." }),
  hasBalcony: z.boolean().default(false),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
});

export type Room = z.infer<typeof roomSchema>;
