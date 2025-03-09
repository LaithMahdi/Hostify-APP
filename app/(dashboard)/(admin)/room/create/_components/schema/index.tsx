import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.number().min(1, { message: "Le numéro de chambre est requis" }),
  type: z.string().min(1, { message: "Le type de chambre est requis" }),
  pricePerNight: z.number().min(1, { message: "Le prix par nuit est requis" }),
  status: z.string().min(1, { message: "Le statut est requis" }),
  capacity: z.number().min(1, { message: "La capacité est requise" }),
  hasBalcony: z.boolean().default(false),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  equipment: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export type Room = z.infer<typeof roomSchema>;
