"use client";
import { Button } from "@/components/ui/button";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import useIsArabic from "@/hooks/useIsArabic";

export default function FirmsFilter() {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const isArabic = useIsArabic();
  const router = useRouter();
  const filterOpen = searchParams.get("filterOpen") === "true" ? true : false;

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };
  return (
    <Button
      className={cn(
        "h-8 px-2 text-[11px] sm:h-9 sm:px-3 sm:text-xs md:px-4 md:text-sm",
        isArabic ? "md:text-base font-semibold" : "",
      )}
      onClick={() => {
        handleSetCategory({ filterOpen: filterOpen ? "" : "true" });
      }}
      variant={filterOpen ? "defaultBH" : "outline2"}
    >
      <Filter /> {t("filter")}
    </Button>
  );
}
