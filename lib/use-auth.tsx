import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
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
      isLoggedIn: false,
      name: "",
      email: "",
      role: "",
      setUser: (user) =>
        set({
          isLoggedIn: true,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      logout: () => set({ isLoggedIn: false, name: "", email: "", role: "" }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
