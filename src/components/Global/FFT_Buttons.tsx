"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import SwitchIcon from "./Icons/SwitchIcon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import useIsArabic from "@/hooks/useIsArabic";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function FFT_Buttons() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = useIsArabic();
  const isFutures = pathname.startsWith("/futures");

  // Track cumulative rotation so it always spins forward
  const [rotation, setRotation] = useState(isFutures ? 180 : 0);
  const prevIsFutures = useRef(isFutures);

  useEffect(() => {
    if (prevIsFutures.current !== isFutures) {
      setRotation((prev) => prev + 180);
      prevIsFutures.current = isFutures;
    }
  }, [isFutures]);

  const handleChange = (value: "/" | "/futures") => {
    if (value === "/futures" && isFutures) return null;
    if (value === "/" && !isFutures) return null;
    if (value === "/futures") {
      const newPathName = value + pathname;
      router.push(newPathName, { scroll: false });
    }
    if (value === "/") {
      const newPathName = pathname.split("/futures")[1]
        ? pathname.split("/futures")[1]
        : "/";
      router.push(newPathName, { scroll: false });
    }
  };

  return (
    <div className="border max-w-max p-0.5 flex justify-center items-center gap-1 sm:gap-2 rounded-full bg-primary/10">
      {/* Forex Button */}
      <Button
        className={cn(
          "px-2! sm:px-4! h-8 sm:h-9 min-w-20 sm:min-w-24 transition-all duration-300",
          isArabic && "text-base md:text-lg",
        )}
        variant={isFutures ? "ghost" : "default"}
        onClick={() => handleChange("/")}
      >
        {t("forex")}
      </Button>

      {/* Switch Icons */}
      <motion.div
        className="max-w-max"
        animate={{ rotate: rotation }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <SwitchIcon className="text-success" />
        <SwitchIcon className="rotate-180 -mt-0.5 text-primary-dark" />
      </motion.div>

      {/* Futures Button */}
      <Button
        className={cn(
          "px-2! sm:px-4! h-8 sm:h-9 min-w-20 sm:min-w-24 transition-all duration-300",
          isArabic && "text-base md:text-lg",
        )}
        variant={isFutures ? "default" : "ghost"}
        onClick={() => handleChange("/futures")}
      >
        {t("futures")}
      </Button>
    </div>
  );
}
