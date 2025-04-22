import Footer from "./_components/footer";
import Header from "./_components/header";

interface Props {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
