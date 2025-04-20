import { Mars, Venus } from "lucide-react";
import { z } from "zod";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const genderList = [
  { label: "Male", value: Gender.MALE, icon: Mars },
  { label: "Female", value: Gender.FEMALE, icon: Venus },
];

export enum Relationship {
  SPOUSE = "SPOUSE",
  PARTNER = "PARTNER",
  CHILD = "CHILD",
  PARENT = "PARENT",
  SIBLING = "SIBLING",
  FRIEND = "FRIEND",
  RELATIVE = "RELATIVE",
  OTHER = "OTHER",
}

export const relationshipsList = [
  { label: "Spouse", value: Relationship.SPOUSE },
  { label: "Partner", value: Relationship.PARTNER },
  { label: "Child", value: Relationship.CHILD },
  { label: "Sibling", value: Relationship.SIBLING },
  { label: "friend", value: Relationship.FRIEND },
  { label: "Relative", value: Relationship.RELATIVE },
  { label: "Other", value: Relationship.OTHER },
];

export const formSchema = z.object({
  cin: z
    .string()
    .min(1, { message: "CIN is required." })
    .max(8, { message: "CIN must be 8 digits." })
    .refine((v) => parseInt(v)),
  numPassport: z.string().refine((v) => parseInt(v)),
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  gender: z.nativeEnum(Gender).default(Gender.MALE),
  age: z.coerce.number().min(1, { message: "Age is required." }),
  relationship: z.nativeEnum(Relationship).default(Relationship.OTHER),
  members: z.array(
    z.object({
      fullName: z.string().min(1, { message: "Full name is required." }),
      gender: z.nativeEnum(Gender).default(Gender.MALE),
      relationship: z.nativeEnum(Relationship).default(Relationship.OTHER),
      isManier: z.boolean().default(false),
    })
  ),
});
