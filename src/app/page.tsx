import Image from "next/image";
import logo1 from "@/assets/logo.png";

/**
 * Main app page – Coming Soon only.
 * Locale routes (app/[locale]/...) are not used for now to avoid deploy complexity.
 */
export default function HomePage() {
  return (
    <div className="bg-primary min-h-screen overflow-hidden relative">
      <div className="pt-8 flex justify-center bg-background min-h-[calc(100vh-260px)] md:min-h-[calc(100vh-420px)] relative">
        <div className="fixed inset-0 flex justify-center items-center flex-col gap-6 md:gap-8 z-10 p-5">
          <div className="aspect-8/9 h-32 md:h-[180px] lg:h-[220px] xl:h-[250px] relative">
            <Image
              src={logo1}
              alt="Funded For You"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-3.5 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
              Coming Soon
            </h1>
            <p className="text-sm md:text-base font-normal text-gray-300 max-w-md mx-auto">
              Be ready for the best platform for comparing prop trading firms
            </p>
          </div>
        </div>
        <div className="w-[calc(100vw+100px)] h-80 md:h-120 absolute -bottom-40 md:-bottom-75 blur-xl bg-shadow-500 bg-background rounded-[50%] shadow-[0_80px_80px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
}
