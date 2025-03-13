import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.number().min(1, { message: "Room number must be a positive number." }),
  type: z.string().min(1, { message: "Room type is required." }),
  pricePerNight: z.number().min(0, { message: "Price must be a positive number." }),
  status: z.string().min(1, { message: "Status is required." }),
  capacity: z.number().min(1, { message: "Capacity must be at least 1." }),
  hasBalcony: z.boolean().default(false),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  
});

export type Room = z.infer<typeof roomSchema>;
