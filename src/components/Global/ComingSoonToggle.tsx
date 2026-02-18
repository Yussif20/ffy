"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import SwitchIcon from "./Icons/SwitchIcon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import useIsArabic from "@/hooks/useIsArabic";

export default function ComingSoonToggle() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = useIsArabic();
  const isFutures = pathname.includes("/futures");

  const handleChange = (value: "forex" | "futures") => {
    if (value === "futures" && isFutures) return;
    if (value === "forex" && !isFutures) return;

    if (value === "futures") {
      router.push("/futures/coming-soon", { scroll: false });
    } else {
      router.push("/coming-soon", { scroll: false });
    }
  };

  return (
    <div className="border max-w-max p-0.5 flex justify-center items-center gap-1 sm:gap-2 rounded-full bg-primary/10">
      {/* Forex Button */}
      <Button
        className={cn(
          "px-2! sm:px-4! h-8 sm:h-9 min-w-20 sm:min-w-24",
          isArabic && "text-base md:text-lg"
        )}
        variant={isFutures ? "ghost" : "default"}
        onClick={() => handleChange("forex")}
      >
        {t("forex")}
      </Button>

      {/* Switch Icons */}
      <div
        className={`max-w-max transition-transform ${
          isFutures ? "rotate-180" : ""
        }`}
      >
        <SwitchIcon className="text-success" />
        <SwitchIcon className="rotate-180 -mt-0.5 text-primary-dark" />
      </div>

      {/* Futures Button */}
      <Button
        className={cn(
          "px-2! sm:px-4! h-8 sm:h-9 min-w-20 sm:min-w-24",
          isArabic && "text-base md:text-lg"
        )}
        variant={isFutures ? "default" : "ghost"}
        onClick={() => handleChange("futures")}
      >
        {t("futures")}
      </Button>
    </div>
  );
}
