"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import HeroScene from "@/components/3d/HeroScene";
import Container from "./Container";
import { cn } from "@/lib/utils";

const COLOR_SCHEMES = {
  forex:   { spotlight: "#4ae79e", candlestick: "#4ae79e" },
  futures: { spotlight: "#ffd23f", candlestick: "#ffd23f" },
} as const;

export default function Hero() {
  const pathname = usePathname();
  const isFutures = pathname.startsWith("/futures");
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const currentColors = isFutures ? COLOR_SCHEMES.futures : COLOR_SCHEMES.forex;
  const isArabic = locale === "ar";

  return (
    <div
      id="top"
      className="relative h-screen overflow-hidden bg-background rounded-b-[50px]"
    >
      {/* 3D Scene — desktop only (lg+) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <HeroScene
          spotlightColor={currentColors.spotlight}
          candlestickColor={currentColors.candlestick}
          mirror={isArabic}
        />
      </div>

      {/* Mobile / tablet decorative background (hidden on lg+) */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none">
        {/* Large central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        {/* Top-right accent */}
        <div className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full bg-primary/6 blur-[90px]" />
        {/* Bottom-left accent */}
        <div className="absolute -bottom-10 -left-10 w-[280px] h-[280px] rounded-full bg-primary/5 blur-[80px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Diagonal geometric accent line */}
        <div className="absolute top-0 right-0 w-px h-[60%] bg-gradient-to-b from-transparent via-primary/20 to-transparent translate-x-[-120px] sm:translate-x-[-200px]" />
        <div className="absolute top-0 right-0 w-px h-[40%] bg-gradient-to-b from-transparent via-primary/10 to-transparent translate-x-[-80px] sm:translate-x-[-140px]" />
      </div>

      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-background/70 to-transparent" />

      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Text-side readability fade — desktop only */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 z-10 hidden lg:block",
          isArabic
            ? "right-0 w-[40%] bg-gradient-to-l from-background/50 to-transparent"
            : "left-0 w-[40%] bg-gradient-to-r from-background/50 to-transparent",
        )}
      />

      {/* Ambient primary glow — always present */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-40 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* ── Layout ──
          Mobile/tablet : text centred in the full screen.
          Desktop (lg+)  : strict 1/3 text | 2/3 3D side-by-side. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <Container className="w-full">

          {/* Text column */}
          <div
            className={cn(
              "pointer-events-auto",
              "flex flex-col gap-5 sm:gap-7 lg:gap-7",
              // Mobile: full width centred; desktop: left 1/3
              "w-full lg:w-1/3",
              !isArabic && "items-center lg:items-start",
              isArabic && "items-end lg:ml-auto",
            )}
          >
            {/* Decorative accent */}
            <div className={cn("flex items-center gap-3", isArabic && "flex-row-reverse")}>
              <div className="h-px w-14 bg-primary/70" />
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="h-px w-8 bg-primary/30" />
            </div>

            {/* Heading */}
            <h1
              className={cn(
                "font-extrabold leading-[1.1] tracking-tight",
                "text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
                !isArabic && "text-center lg:text-left",
                isArabic && "text-right",
              )}
            >
              {t("heroTitle.title1")}
              <span className="text-primary block mt-1"> {t("heroTitle.title2")}</span>
            </h1>

            {/* Subtitle */}
            <p
              className={cn(
                "text-muted-foreground/90 leading-relaxed",
                "text-sm sm:text-base lg:text-lg",
                "max-w-xs sm:max-w-sm lg:max-w-none",
                !isArabic && "text-center lg:text-left",
                isArabic && "text-right",
              )}
            >
              {t("heroTitle.subtitle")}
            </p>
          </div>

        </Container>
      </div>
    </div>
  );
}
