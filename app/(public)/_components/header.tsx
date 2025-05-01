"use client";
import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarDropdown from "./avatar-dropdown";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [header, setHeader] = useState<boolean>(false);
  const { role, email, name } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 || pathname !== "/") {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Guest Houses", href: "#guest-house" },
    { label: "Rooms", href: "#room" },
    { label: "Contact", href: "#contact" },
  ];

  const isAuthenticated = role !== "";

  console.log("Header isLoggedIn:", isAuthenticated);

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"}`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0">
        {/* Logo */}
        <Link href="/">
          <Logo className={cn("text-white", header && "text-mainColor")} />
        </Link>

        {/* Nav */}
        <nav
          className={cn(
            "flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase",
            header ? "text-mainColor" : "text-white"
          )}
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              className={cn(
                "transition",
                header ? "hover:text-mainColor/80" : "hover:text-white/80"
              )}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isAuthenticated == false ? (
          <Button variant="primary" onClick={() => router.push("/login")}>
            Login
          </Button>
        ) : (
          <AvatarDropdown email={email} name={name} />
        )}
      </div>
    </header>
  );
};

export default Header;
