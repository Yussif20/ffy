"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import HeroScene from "@/components/3d/HeroScene";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

const COLOR_SCHEMES = {
  forex:   { spotlight: "#4ae79e", candlestick: "#4ae79e" },
  futures: { spotlight: "#c9a227", candlestick: "#c9a227" },
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
      className="relative overflow-hidden bg-background rounded-b-[50px] lg:min-h-[60vh]"
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
          Mobile/tablet : text centred.
          Desktop (lg+) : strict 1/3 text | 2/3 3D side-by-side. */}
      <div className="relative z-20 flex items-center py-16 md:py-24 lg:py-28">
        <Container className="w-full">

          {/* Text column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "pointer-events-auto",
              "flex flex-col gap-5 sm:gap-7 lg:gap-7",
              // Mobile: full width centred; desktop: left 1/3
              "w-full lg:w-1/3",
              !isArabic && "items-center lg:items-start",
              isArabic && "items-end lg:ml-auto",
            )}
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className={cn(
                "font-extrabold leading-[1.1] tracking-tight",
                "text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl",
                !isArabic && "text-center lg:text-left",
                isArabic && "text-right",
              )}
            >
              {t("heroTitle.title1")}
              <span className="text-primary block mt-1"> {t("heroTitle.title2")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className={cn(
                "text-muted-foreground/90 leading-relaxed",
                "text-sm sm:text-base lg:text-lg 2xl:text-base",
                "max-w-xs sm:max-w-sm lg:max-w-none",
                !isArabic && "text-center lg:text-left",
                isArabic && "text-right",
              )}
            >
              {t("heroTitle.subtitle")}
            </motion.p>
          </motion.div>

        </Container>
      </div>
    </div>
  );
}
