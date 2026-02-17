import { getTranslations } from "next-intl/server";
import Container from "./Container";
import Logo from "@/utils/Logo";
import { ChevronDown } from "lucide-react";

// --- Previous fixed-height hero (h-screen) — commented out ---
// export default async function Hero() {
//   const t = await getTranslations("HomePage");
//   return (
//     <div
//       id="top"
//       className="bg-primary h-screen overflow-hidden rounded-b-[50px]"
//     >
//       <div className="pt-8 flex justify-center bg-background h-[calc(100vh-260px)] md:h-[calc(100vh-420px)] relative">
//         <div className="absolute w-full h-screen top-0 flex justify-center items-center flex-col gap-5 z-10">
//           <Container className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-5 gap-x-10">
//             <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 min-w-0 flex-1 lg:flex-initial">
//               <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl max-w-[900px] lg:leading-tight text-center lg:text-start uppercase">
//                 {t("heroTitle.title1")}
//                 <span className="text-primary"> {t("heroTitle.title2")}</span>
//               </h1>
//               <p className="text-foreground/60 text-sm md:text-base max-w-md text-center lg:text-start">
//                 {t("heroTitle.subtitle")}
//               </p>
//               <a
//                 href="#tabs-section"
//                 className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-3 sm:px-6 rounded-full transition-colors text-sm md:text-base shrink-0 min-h-11 min-w-[140px] sm:min-w-0 text-center"
//               >
//                 <span className="whitespace-normal sm:whitespace-nowrap">{t("heroTitle.cta")}</span>
//                 <ChevronDown size={16} className="shrink-0 hidden sm:block" />
//               </a>
//             </div>
//             <div className="mx-auto shrink-0">
//               <div className="aspect-8/9 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
//                 <Logo />
//               </div>
//             </div>
//           </Container>
//         </div>
//         <div className="w-[calc(100vw+100px)] h-150 md:h-150 absolute -bottom-50 md:-bottom-75 blur-xl bg-shadow-500 bg-background rounded-[50%] shadow-[0_80px_80px_rgba(0,0,0,0.8)]"></div>
//       </div>
//     </div>
//   );
// }

export default async function Hero() {
  const t = await getTranslations("HomePage");
  return (
    <div id="top" className="bg-primary rounded-b-[50px]">
      <div className="py-16 md:py-24 lg:py-28 bg-background">
        <Container className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-8 lg:gap-10">
          {/* Left: text + CTA */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 min-w-0 flex-1 lg:flex-initial">
            <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl max-w-[900px] lg:leading-tight text-center lg:text-start uppercase">
              {t("heroTitle.title1")}
              <span className="text-primary"> {t("heroTitle.title2")}</span>
            </h1>
            <p className="text-foreground/60 text-sm md:text-base max-w-md text-center lg:text-start">
              {t("heroTitle.subtitle")}
            </p>
            <a
              href="#tabs-section"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-3 sm:px-6 rounded-full transition-colors text-sm md:text-base shrink-0 min-h-11 min-w-[140px] sm:min-w-0 text-center"
            >
              <span className="whitespace-normal sm:whitespace-nowrap">{t("heroTitle.cta")}</span>
              <ChevronDown size={16} className="shrink-0 hidden sm:block" />
            </a>
          </div>

          {/* Right: logo */}
          <div className="mx-auto shrink-0">
            <div className="aspect-8/9 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
              <Logo />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
