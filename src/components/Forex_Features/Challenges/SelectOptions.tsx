"use client";

import CustomSlider from "@/components/Global/CustomSlider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyShort } from "@/lib/formatCurrencyShort ";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import useIsArabic from "@/hooks/useIsArabic";

type PropType = {
  cols?: number;
  options: { name: string; value: string }[];
  name: string;
  title: string;
  defaultValue?: string;
  triggerClassName?: string;
  custom?: {
    show: true;
    max: number;
    min: number;
    identifier?: string;
  };
};

export default function SelectOptions({
  cols,
  options,
  name,
  title,
  custom,
  defaultValue,
  triggerClassName,
}: PropType) {
  const text = useTranslations("SelectOption");
  const isArabic = useIsArabic();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesText = searchParams.get(name) || "";
  const categories = categoriesText ? categoriesText.split(",") : [];
  const hasAppliedDefault = useRef(false);

  // Set default value only on initial load when no param exists (e.g. 100k for size filter)
  // Don't re-apply when user explicitly clears the selection
  useEffect(() => {
    if (hasAppliedDefault.current) return;
    const hasParam = searchParams.get(name) || searchParams.get(`${name}_range`);
    if (hasParam) {
      hasAppliedDefault.current = true;
      return;
    }
    if (defaultValue) {
      hasAppliedDefault.current = true;
      handleSetSearchParams({ [name]: defaultValue }, searchParams, router);
    }
  }, [defaultValue, name, searchParams, router]);
  const rangeText = searchParams.get(`${name}_range`);
  const range = rangeText?.split("-").map(Number) || [];
  const isCustom = !!rangeText;

  const handleSetCategory = (value: string) => {
    const isExist = categories.find((item) => item === value);
    const newCategories = isExist
      ? categories.filter((item) => item !== value)
      : [...categories, value];
    handleSetSearchParams(
      { [name]: newCategories.join(","), [`${name}_range`]: "" },
      searchParams,
      router
    );
  };

  const handleSetRange = (range: string) => {
    handleSetSearchParams(
      { [`${name}_range`]: range, [name]: "" },
      searchParams,
      router
    );
  };
  const showingText = isCustom
    ? `${custom?.identifier || "$"}${formatCurrencyShort(range[0], false)} - ${
        custom?.identifier || "$"
      }${formatCurrencyShort(range[1], false)}`
    : categories.length < 1
    ? text("select")
    : categories.length === 1
    ? options.find((item) => item.value === categories[0])?.name
    : text("multiple");
  const usableCols = cols
    ? cols
    : options.length < 6
    ? 2
    : options.length > 7
    ? 4
    : 3;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            className={cn(
              "h-8 px-2 text-[11px] sm:h-9 sm:px-3 sm:text-xs md:text-sm",
              isArabic && "font-semibold",
              triggerClassName
            )}
            variant={"outline"}
          >
            {title}: <span>{showingText}</span> <ChevronDown />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2">
        <div className="p-2 space-y-4">
          <h2 className="text-sm font-semibold">
            {text("selectOneOrMultiple")}
          </h2>
          <div
            className="grid gap-2"
            style={{ 
              gridTemplateColumns: `repeat(${usableCols}, 1fr)`,
              ...(isArabic && { direction: 'rtl' })
            }}
          >
            {options.map((item) => {
              const isExist = categories.find((cat) => cat === item.value);
              return (
                <Button
                  onClick={() => handleSetCategory(item.value)}
                  className={cn(
                    "w-full",
                    isArabic && "font-semibold",
                    isExist &&
                      "bg-primary/15 border-2 border-primary text-primary font-semibold hover:bg-primary/25 hover:border-primary"
                  )}
                  variant={isExist ? "outline2" : "outline2"}
                  key={item.value}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
          {custom && custom.show && (
            <>
              <Button
                onClick={() =>
                  handleSetRange(
                    isCustom ? "" : [custom.min, custom.max].join(",")
                  )
                }
                size={"lg"}
                className={cn(
                  "w-full",
                  isArabic && "font-semibold",
                  isCustom &&
                    "bg-primary/15 border-2 border-primary text-primary font-semibold hover:bg-primary/25 hover:border-primary"
                )}
                variant="outline2"
              >
                {text("custom")}
              </Button>
              {isCustom && (
                <CustomSlider
                  min={custom.min}
                  max={custom.max}
                  extraQuery={{ [name]: "" }}
                  name={`${name}_range`}
                />
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
