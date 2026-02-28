"use client";
import { Button } from "@/components/ui/button";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import useIsArabic from "@/hooks/useIsArabic";

export default function FirmsFilter() {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const isArabic = useIsArabic();
  const router = useRouter();
  const category = searchParams.get("category") || "";
  const filterOpen = searchParams.get("filterOpen") === "true" ? true : false;

  // "New" filter hidden for now
  const categories: { name: string; value: string; icon?: IconType }[] = [
    { name: t("all"), value: "" },
  ];

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };
  return (
    <div className="flex justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-4 items-center overflow-x-auto">
      <Button
        className={cn(
          "h-8 px-2! text-[11px] sm:h-9 sm:px-3! sm:text-xs md:px-6! md:text-sm",
          isArabic ? "md:text-base font-semibold" : ""
        )}
        onClick={() => {
          handleSetCategory({ filterOpen: filterOpen ? "" : "true" });
        }}
        variant={filterOpen ? "defaultBH" : "secondary"}
      >
        <Filter /> {t("filter")}
      </Button>
      <div className="flex gap-1.5 sm:gap-2 md:gap-4 items-center">
        {categories.map((item) => {
          const isActive = category === item.value;
          return (
            <Button
              key={item.value}
              className={cn(
                "h-8 px-2! text-[11px] sm:h-9 sm:px-3! sm:text-xs md:px-6! md:text-sm",
                isArabic ? "md:text-base font-semibold" : ""
              )}
              onClick={() => handleSetCategory({ category: item.value })}
              variant={isActive ? "default" : "outline"}
            >
              {item.icon && (
                <item.icon
                  className={cn("text-primary", isActive && "text-foreground")}
                />
              )}
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
