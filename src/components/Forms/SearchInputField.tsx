"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LinearBorder from "@/components/Global/LinearBorder";
import useIsArabic from "@/hooks/useIsArabic";

type SearchInputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

export default function SearchInputField({
  value,
  onChange,
  onSubmit,
  placeholder = "Search Here",
  className,
  "aria-label": ariaLabel = placeholder,
}: SearchInputFieldProps) {
  const isArabic = useIsArabic();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={cn("max-w-sm w-full", className)}
    >
      <LinearBorder className="w-full max-w-full">
        <div className={cn("relative flex items-center w-full", isArabic && "flex-row-reverse")}>
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 text-muted-foreground pointer-events-none",
              isArabic ? "right-3" : "left-3"
            )}
          >
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="search"
            withoutLinearBorder
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            dir={isArabic ? "rtl" : "ltr"}
            className={cn(
              "h-11 w-full flex-1 min-w-0 pl-9 pr-11 rounded-full border-0 bg-transparent text-sm",
              isArabic ? "pr-9 pl-11 text-base font-semibold text-right" : ""
            )}
            aria-label={ariaLabel}
          />
          <div
            className={cn(
              "absolute top-0 bottom-0 flex items-center shrink-0",
              isArabic ? "left-0 pl-1" : "right-0 pr-1"
            )}
          >
            <Button type="submit" size="sm" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </LinearBorder>
    </form>
  );
}
