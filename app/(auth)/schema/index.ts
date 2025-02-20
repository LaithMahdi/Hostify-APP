import { z } from "zod";
import { role } from "../types";

export const signInSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),

  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
  role: z.nativeEnum(role).default(role.USER),
});
