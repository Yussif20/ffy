"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import HeroScene from "@/components/3d/HeroScene";
import Container from "./Container";

// Color schemes for Forex vs Futures
const COLOR_SCHEMES = {
  forex: {
    spotlight: "#4ae79e",
    candlestick: "#4ae79e",
  },
  futures: {
    spotlight: "#ffd23f",
    candlestick: "#ffd23f",
  },
} as const;

export default function Hero() {
  const pathname = usePathname();
  const isFutures = pathname.startsWith("/futures");
  const t = useTranslations("HomePage");
  const locale = useLocale();

  // Select colors based on current route
  const currentColors = isFutures ? COLOR_SCHEMES.futures : COLOR_SCHEMES.forex;

  // Mirror the scene for Arabic (RTL) language
  const isArabic = locale === "ar";

  return (
    <div
      id="top"
      className="bg-primary h-screen overflow-hidden rounded-b-[50px]"
    >
      <div className="pt-8 flex justify-center bg-background h-[calc(100vh-260px)] lg:h-[calc(100vh-420px)] relative">
        {/* 3D Scene Layer */}
        <div className="absolute w-full h-screen top-0 flex justify-center items-center flex-col gap-5 z-10">
          <HeroScene
            spotlightColor={currentColors.spotlight}
            candlestickColor={currentColors.candlestick}
            mirror={isArabic}
          />
        </div>

        {/* Text Content Layer - Positioned over the Scene */}
        <div className="absolute w-full bottom-0 flex justify-center items-center z-20">
          <Container className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-5 gap-x-10">
            <h1 className="font-bold text-3xl lg:text-4xl xl:text-5xl max-w-[900px] lg:leading-normal text-center lg:text-start uppercase">
              {t("heroTitle.title1")}
              <span className="text-primary"> {t("heroTitle.title2")}</span>
            </h1>

            <div className="mx-auto"></div>
          </Container>
        </div>

        {/* Bottom shadow/gradient effect */}
        <div className="w-[calc(100vw+100px)] h-150 md:h-150 absolute -bottom-50 md:-bottom-75 blur-xl bg-shadow-500 bg-background rounded-[50%] shadow-[0_80px_80px_rgba(0,0,0,0.8)]"></div>
      </div>
    </div>
  );
}
