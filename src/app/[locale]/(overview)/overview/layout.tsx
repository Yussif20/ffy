import Sidebar from "@/components/Overview/Sidebar";
import Container from "@/components/Global/Container";
import "@/styles/globals.css";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Funded",
  description: "Template",
};

export default async function OverviewLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div className="flex relative min-h-screen bg-gradient-to-br from-muted/20 via-background to-primary/5">
      <div className="h-max sticky top-0 z-50">
        <Sidebar />
      </div>
      <main className="flex-1 min-h-screen transition-[padding] duration-300">
        <Container className="w-full pt-16 ps-0 pe-4 sm:pe-6 bg-card/80 lg:pe-8">
          <div className="border border-border/60 border-s-0 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20 p-6 sm:p-8 lg:p-10 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}
