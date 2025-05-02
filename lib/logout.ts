// /lib/logout.ts
"use client";

import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import { removeCookie } from "./cookies";
import { COOKIE_KEY } from "@/lib/keys";

export function useLogout() {
  const logoutStore = useUserStore((state) => state.logout);
  const router = useRouter();

  return async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      logoutStore();
      removeCookie(COOKIE_KEY, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/login"; // full reload to clear state
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };
}
