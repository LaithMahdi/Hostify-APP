import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z
    .number()
    .min(3, {
      message: "Le numéro de chambre doit être un nombre supérieur à 0",
    })
    .default(1),
  type: z.string().min(1, { message: "Le type de chambre est requis" }),
  pricePerNight: z
    .number()
    .min(1, { message: "Le prix par nuit doit être un nombre supérieur à 0" })
    .default(90),
  status: z.string().min(1, { message: "Le statut est requis" }),
  capacity: z
    .number()
    .min(1, { message: "La capacité doit être un nombre supérieur à 0" })
    .default(1),
  hasBalcony: z.boolean().default(false),
  description: z.string().min(1, { message: "La description est requise" }),
  isActive: z.boolean().default(true),
  equipements: z.array(z.number()).optional(),
  images: z.array(z.string()).optional(),
});
export type Room = z.infer<typeof roomSchema>;
