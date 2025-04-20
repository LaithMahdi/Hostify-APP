"use client";
import Logo from "@/components/svg/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [header, setHeader] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    );
  });

  const navLinks = ["Home", "Rooms", "Restaurant", "Spa", "Contact"];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"}`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0">
        <Link href="/">
          <Logo className={cn("text-black", !header && "text-white")} />
        </Link>

        <nav
          className={cn(
            "flex gap-x-4 lg:gap-x-8 font-medium tracking-[3px] text-[15px] items-center uppercase",
            header ? "text-black" : "text-white"
          )}
        >
          {navLinks.map((link) => (
            <Link
              href="/"
              className={cn(
                "transition hover:text-black/80",
                !header && "hover:text-white/80"
              )}
              key={link}
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* <Button>Login</Button> */}
      </div>
    </header>
  );
};

export default Header;
