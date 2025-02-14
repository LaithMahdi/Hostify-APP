import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/home/header";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "@/components/ui/toaster";

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
        <NuqsAdapter>
          <QueryProvider>
            <Toaster />
            <NextTopLoader
              color="#1968e6"
              initialPosition={0.08}
              crawlSpeed={200}
              height={5}
              easing="ease"
              speed={200}
              zIndex={1600}
            />
            <Header />
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
