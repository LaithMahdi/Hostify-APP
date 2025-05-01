import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import { removeCookie } from "./cookies";
import { COOKIE_KEY } from "@/lib/keys"; // Import the same constant used in middleware

export function useLogout() {
  const logoutStore = useUserStore((state) => state.logout);
  const router = useRouter();

  return async () => {
    try {
      // 1. Call server-side logout endpoint to clear the cookie properly
      await fetch("/api/auth/logout", { method: "POST" });

      // 2. Clear user info from Zustand
      logoutStore();

      // 3. Also clear the client-side cookie to be thorough
      removeCookie(COOKIE_KEY, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      // 4. Force a full page reload to clear any in-memory state
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Still try to redirect even if the API call fails
      window.location.href = "/login";
    }
  };
}
