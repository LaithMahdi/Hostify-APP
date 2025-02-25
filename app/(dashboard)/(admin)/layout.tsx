import Navbar from "@/components/ui/components/navbar";
import Sidebar from "@/components/ui/components/sidebar";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex min-h-screen lg:w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-72 md:pr-12 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
