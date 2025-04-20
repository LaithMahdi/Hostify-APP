import Footer from "./_components/footer";
import Header from "./_components/header";

interface Props {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: Props) => {
  return (
    <div className="h-full w-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
