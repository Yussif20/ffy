import { getTranslations } from "next-intl/server";
import Container from "./Container";
import HeroCoinClient from "./HeroCoinClient";
import { ChevronDown } from "lucide-react";

export default async function Hero() {
  const t = await getTranslations("HomePage");
  return (
    <div
      id="top"
      className="bg-primary h-screen overflow-hidden rounded-b-[50px]"
    >
      <div className="pt-8 flex justify-center bg-background h-[calc(100vh-260px)] md:h-[calc(100vh-420px)] relative">
        <div className="absolute w-full h-screen top-0 flex justify-center items-center flex-col gap-5 z-10">
          <Container className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-5 gap-x-10">
            {/* Left: text + CTA */}
            <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6">
              <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl max-w-[900px] lg:leading-tight text-center lg:text-start uppercase">
                {t("heroTitle.title1")}
                <span className="text-primary"> {t("heroTitle.title2")}</span>
              </h1>
              <p className="text-foreground/60 text-sm md:text-base max-w-md text-center lg:text-start">
                {t("heroTitle.subtitle")}
              </p>
              <a
                href="#tabs-section"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm md:text-base"
              >
                {t("heroTitle.cta")}
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Right: 3D coin */}
            <div className="mx-auto shrink-0">
              <div className="aspect-8/9 h-64 md:h-[340px] lg:h-[440px] xl:h-[500px] relative">
                <HeroCoinClient />
              </div>
            </div>
          </Container>
        </div>

        <div className="w-[calc(100vw+100px)] h-150 md:h-150 absolute -bottom-50 md:-bottom-75 blur-xl bg-shadow-500 bg-background rounded-[50%] shadow-[0_80px_80px_rgba(0,0,0,0.8)]"></div>
      </div>
    </div>
  );
}
