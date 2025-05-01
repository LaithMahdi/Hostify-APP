import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string;
  email: string;
  role: "OWNER" | "USER" | "ADMIN" | "";
  setUser: (user: {
    name: string;
    email: string;
    role: "OWNER" | "USER" | "ADMIN";
  }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      role: "",
      setUser: (user) =>
        set({
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      logout: () => set({ name: "", email: "", role: "" }),
    }),
    {
      name: "user-storage",
    }
  )
);
