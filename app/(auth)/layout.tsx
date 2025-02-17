"use client";
import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isSignIn = pathName === "/login";

  const linkHref = isSignIn ? "/sign-up" : "/login";
  const linkText = isSignIn ? "Create account" : "Sign in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="">
            <Logo className="size-12 text-mainColor" />
          </div>
          <Button variant="link" onClick={() => router.push(linkHref)}>
            {linkText}
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
