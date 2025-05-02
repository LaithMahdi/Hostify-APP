"use client";
import AvatarDropdown from "@/app/(public)/_components/avatar-dropdown";
import MobileSidebar from "./mobile-sidebar";
import { useUserStore } from "@/stores/user";

const Navbar = () => {
  const { role, email, name } = useUserStore();

  return (
    <nav className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex flex-1 justify-end">
        <AvatarDropdown email={email} name={name} />
      </div>

      {/* <NavbarRoutes /> */}
    </nav>
  );
};

export default Navbar;
