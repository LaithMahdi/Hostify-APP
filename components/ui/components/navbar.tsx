import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      {/* <NavbarRoutes /> */}
    </nav>
  );
};

export default Navbar;
