import type { Metadata } from "next";
import "@/styles/globals.css";
import Container from "@/components/Global/Container";
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
      <div className="pb-20 pt-6">
        <Container>
          <PageTransition>{children}</PageTransition>
        </Container>
      </div>
    </div>
  );
}
