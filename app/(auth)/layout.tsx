"use client";
import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();
  const isSignIn = pathName === "/sign-in";

  const resetPasswordPaths = ["/forgot-password", "/verify"];
  const isResetPassword = resetPasswordPaths.some((path) =>
    pathName.startsWith(path)
  );

  const linkHref = isResetPassword
    ? "/sign-up"
    : isSignIn
    ? "/sign-up"
    : "/sign-in";
  const linkText = isResetPassword
    ? "Create account"
    : isSignIn
    ? "Sign up"
    : "Sign in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Logo className="w-12 h-12" />
          <Button asChild variant="secondary">
            <Link href={linkHref}>{linkText}</Link>
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
