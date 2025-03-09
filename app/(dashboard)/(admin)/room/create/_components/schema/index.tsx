import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.string().refine((val) => val.length > 0, {
    message: "Le numéro de chambre est requis",
  }),
  type: z.string().min(1, { message: "Le type de chambre est requis" }),
  pricePerNight: z.number().min(1, { message: "Le prix par nuit est requis" }),
  status: z.string().min(1, { message: "Le statut est requis" }),
  capacity: z.number().min(1, { message: "La capacité est requise" }),
  hasBalcony: z.boolean().default(false),
  description: z.string(),
  isActive: z.boolean().default(true),
  equipment: z.array(z.string()),
  images: z.array(z.string()),
});

export type Room = z.infer<typeof roomSchema>;
