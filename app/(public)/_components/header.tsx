"use client";

import Logo from "@/components/svg/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    );
  });

  const navLinks = ["Home", "Guest Houses", "Rooms", "Contact"];

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
              href="/"
              className={cn(
                "transition",
                header ? "hover:text-mainColor/80" : "hover:text-white/80"
              )}
              key={link}
            >
              {link}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
