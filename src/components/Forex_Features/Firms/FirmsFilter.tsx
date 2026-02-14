"use client";
import { Button } from "@/components/ui/button";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { FaThumbsUp } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import useIsArabic from "@/hooks/useIsArabic";

export default function FirmsFilter() {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const isArabic = useIsArabic();
  const router = useRouter();
  const category = searchParams.get("category") || "";
  const filterOpen = searchParams.get("filterOpen") === "true" ? true : false;

  const categories: { name: string; value: string; icon?: IconType }[] = [
    { name: t("new"), value: "NEW", icon: FaThumbsUp },
    { name: t("all"), value: "" },
  ];

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };
  return (
    <div className="flex gap-2 md:gap-4 items-center overflow-x-auto">
      <Button
        className={cn(
          "px-3! sm:px-6! text-xs sm:text-sm",
          isArabic ? "text-base font-semibold" : ""
        )}
        onClick={() => {
          handleSetCategory({ filterOpen: filterOpen ? "" : "true" });
        }}
        variant={filterOpen ? "defaultBH" : "secondary"}
      >
        <Filter /> {t("filter")}
      </Button>
      <div className="flex gap-2 md:gap-4 items-center">
        {categories.map((item) => {
          const isActive = category === item.value;
          return (
            <Button
              key={item.value}
              className={cn(
                "px-3! sm:px-6! text-xs sm:text-sm",
                isArabic ? "text-base font-semibold" : ""
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
