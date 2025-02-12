import Logo from "@/components/svg/logo";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import Navigation from "./navigation";

const Sidebar = () => {
  return (
    <aside className="h-full bg-white w-full border-r shadow-sm">
      <div className="p-4">
        <Link href="/">
          <Logo className="size-8 text-mainColor" />
        </Link>
      </div>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
