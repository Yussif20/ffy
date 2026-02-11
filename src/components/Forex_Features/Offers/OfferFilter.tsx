"use client";

import SearchForm from "@/components/Forms/SearchForm";
import { Button } from "@/components/ui/button";
import useIsArabic from "@/hooks/useIsArabic";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl"; // assuming you use next-intl
import { useRouter, useSearchParams } from "next/navigation";
import { FaTag } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function OfferFilter() {
  const t = useTranslations("Offers");
  const searchParams = useSearchParams();
  const router = useRouter();
  const isArabic = useIsArabic();
  const isExclusive = searchParams.get("isExclusive") === "true";
  const isCurrentMonth = searchParams.get("isCurrentMonth") === "true";

  const categories = [
    {
      name: t("exclusiveOffers"),
      queryKey: "isExclusive",
      icon: FaTag,
    },
    {
      name: t("allCurrentOffers"),
      queryKey: "all",
      icon: RiDiscountPercentFill,
      defaultIconDesign: "text-foreground/50",
    },
  ];

  const handleSetCategory = (queryKey: string) => {
    if (queryKey === "all") {
      // Remove both filters to show all offers
      const params = new URLSearchParams(searchParams.toString());
      params.delete("isExclusive");
      params.delete("isCurrentMonth");
      params.delete("page"); // Reset to page 1
      router.replace(`?${params.toString()}`, { scroll: false });
    } else {
      // Set the specific filter and remove the other
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // Reset to page 1

      if (queryKey === "isExclusive") {
        params.set("isExclusive", "true");
        params.delete("isCurrentMonth");
      } else if (queryKey === "isCurrentMonth") {
        params.set("isCurrentMonth", "true");
        params.delete("isExclusive");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="flex justify-between md:items-center flex-col lg:flex-row gap-5">
      <div className="flex items-center gap-2 md:gap-4 overflow-auto">
        {categories.map((item) => {
          const isActive =
            item.queryKey === "all"
              ? !isExclusive && !isCurrentMonth
              : item.queryKey === "isExclusive"
              ? isExclusive
              : isCurrentMonth;
          return (
            <Button
              key={item.queryKey}
              onClick={() => handleSetCategory(item.queryKey)}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "text-foreground/70",
                isActive && "text-foreground font-medium",
                isArabic && "font-semibold"
              )}
            >
              {item?.icon && (
                <item.icon
                  className={cn(
                    "text-primary",
                    isActive && "text-success",
                    item?.defaultIconDesign
                  )}
                />
              )}
              {item.name}
            </Button>
          );
        })}
      </div>
      <SearchForm />
    </div>
  );
}
