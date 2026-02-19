import type { Metadata } from "next";
import "@/styles/globals.css";
import Hero from "@/components/Global/hero";
import Container from "@/components/Global/Container";
import HomeNavItems from "@/components/Forex_Features/HomeNavItems";
import Subscribe from "@/components/Forex_Features/Subscribe";
import SectionDivider from "@/components/Global/SectionDivider";
import ScrollReveal from "@/components/Global/ScrollReveal";

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
      <div className="py-6 md:py-10">
        <ScrollReveal delay={0.05}>
          <HomeNavItems />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Container>{children}</Container>
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal delay={0.05}>
          <Subscribe />
        </ScrollReveal>
      </div>
    </div>
  );
}
