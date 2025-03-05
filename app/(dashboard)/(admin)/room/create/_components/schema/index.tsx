import { z } from "zod";


export const formSchema = z.object({
  roomNumber: z.number().min(1, "Le numéro de chambre est requis"), // Définir comme `number`
  type: z.string().min(1, "Le type de chambre est requis"),
  pricePerNight: z.number().min(1, "Le prix par nuit est requis"),
  status: z.string().min(1, "Le statut est requis"),
  capacity: z.number().min(1, "La capacité est requise"),
  hasBalcony: z.boolean(),
  description: z.string().optional(),
  guestHouseId: z.number().min(1, "L'ID de la maison d'hôtes est requis"),
  images: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  isActive: z.boolean(),
});


