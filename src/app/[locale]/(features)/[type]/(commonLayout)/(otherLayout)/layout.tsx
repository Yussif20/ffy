import type { Metadata } from "next";
import "@/styles/globals.css";
import Hero from "@/components/Global/hero";
import Container from "@/components/Global/Container";
import HomeNavItems from "@/components/Forex_Features/HomeNavItems";
import Subscribe from "@/components/Forex_Features/Subscribe";
import PageTransition from "@/components/Global/PageTransition";

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
    <div>
      <Hero />
      <div className="py-30">
        <HomeNavItems />
        <Container>
          <PageTransition>{children}</PageTransition>
        </Container>
        <Subscribe />
      </div>
    </div>
  );
}
