import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hostify",
  description: "Hostify is a web hosting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <NextTopLoader
          color="#F40000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          easing="ease"
          speed={200}
          zIndex={1600}
        />
        {/* <ClientCommons />
        <SiteHeader /> */}
        {children}
        {/* <FooterNav />
        <Footer /> */}
      </body>
    </html>
  );
}
