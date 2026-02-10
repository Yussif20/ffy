import SetTheme from "@/components/Global/SetTheme";
import { ThemeProvider } from "@/components/Global/them-provider";
import TopGradient from "@/components/Global/TopGradient";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { Providers } from "../../providers";
import Sidebar from "@/components/Overview/Sidebar";
import Container from "@/components/Global/Container";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Funded",
  description: "Template",
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${montserrat.variable} relative`}>
        <TopGradient className="absolute top-0 left-0 w-full flex justify-center items-center z-10" />
        <ThemeProvider>
          <Providers>
            {/* Provide locale and messages */}
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div className="flex relative">
                <div className="h-max sticky top-0 z-50">
                  <Sidebar />
                </div>
                <Container className="w-full flex justify-center items-center">
                  <div className="flex  flex-col gap-5  min-h-full w-full overflow-y-hidden pt-20">
                    {children}
                  </div>
                </Container>
              </div>
            </NextIntlClientProvider>
            <SetTheme />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
