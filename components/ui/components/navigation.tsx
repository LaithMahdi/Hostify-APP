"use client";
import { DoorClosed, Layout, School, Sofa, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: School,
    label: "Guest Houses",
    href: "/guest-house",
  },
  {
    icon: DoorClosed,
    label: "Rooms",
    href: "/room",
  },
  {
    icon: Sofa,
    label: "Equipment",
    href: "/equipment",
    items: [],
  },
  {
    icon: Users,
    label: "Guests",
    href: "/guest",
  },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full h-12">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
