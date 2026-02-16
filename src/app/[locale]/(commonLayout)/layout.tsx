import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Global/Navbar/Navbar";
import Footer from "@/components/Global/Footer";

export const metadata: Metadata = {
  title: "Funded For You",
  description: "Explore You Want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-0">
      <Navbar />
      {children}

      <Footer />
    </div>
  );
}
