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
import { Check, ChevronDown } from "lucide-react";
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

  const hasSelection = categories.length >= 1 || isCustom;
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
              "h-8 px-2 text-[11px] sm:h-9 sm:px-3 sm:text-xs md:text-sm transition-all",
              isArabic && "font-semibold",
              hasSelection &&
                "ring-2 ring-primary/25 bg-primary/5 border-primary/40 hover:bg-primary/10 hover:ring-primary/35",
              triggerClassName
            )}
            variant={"outline"}
          >
            {title}:{" "}
            <span className={cn(hasSelection && "font-semibold text-primary")}>
              {showingText}
            </span>{" "}
            <ChevronDown className={cn("size-3.5 opacity-70", hasSelection && "opacity-90")} />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2 min-w-[12rem]">
        <div className="p-2 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground">
            {text("selectOneOrMultiple")}
          </h2>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${usableCols}, 1fr)`,
              ...(isArabic && { direction: "rtl" }),
            }}
          >
            {options.map((item) => {
              const isExist = categories.find((cat) => cat === item.value);
              return (
                <Button
                  onClick={() => handleSetCategory(item.value)}
                  className={cn(
                    "w-full relative gap-2 transition-all",
                    isArabic && "font-semibold",
                    isExist
                      ? "bg-primary/10 border border-primary/60 text-primary font-semibold shadow-sm ring-1 ring-primary/20 hover:bg-primary/15 hover:border-primary/80 hover:ring-primary/30"
                      : "border border-transparent hover:bg-muted/50"
                  )}
                  variant="outline2"
                  key={item.value}
                >
                  {isExist && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Check className="size-3 text-primary" strokeWidth={2.5} />
                    </span>
                  )}
                  <span className="flex-1 text-start">{item.name}</span>
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
                  "w-full relative gap-2 transition-all",
                  isArabic && "font-semibold",
                  isCustom
                    ? "bg-primary/10 border border-primary/60 text-primary font-semibold shadow-sm ring-1 ring-primary/20 hover:bg-primary/15 hover:border-primary/80 hover:ring-primary/30"
                    : "border border-transparent hover:bg-muted/50"
                )}
                variant="outline2"
              >
                {isCustom && (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="size-3 text-primary" strokeWidth={2.5} />
                  </span>
                )}
                <span className="flex-1 text-start">{text("custom")}</span>
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
