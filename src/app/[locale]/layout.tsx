import SetTheme from "@/components/Global/SetTheme";
import { ThemeProvider } from "@/components/Global/them-provider";
import TopGradient from "@/components/Global/TopGradient";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Funded",
  description: "Template",
};

/**
 * Locale layout – used only when visiting /[locale]/... routes.
 * Main app currently shows Coming Soon at / (see app/page.tsx); locale routes are not used for now.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <TopGradient className="absolute top-0 left-0 w-full flex justify-center items-center z-10" />
      <ThemeProvider>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NextTopLoader color="#fff" />
            {children}
          </NextIntlClientProvider>
          <SetTheme />
        </Providers>
      </ThemeProvider>
    </div>
  );
}
