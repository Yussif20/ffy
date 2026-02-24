"use client";

import { cn, handleSetSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import useIsArabic from "@/hooks/useIsArabic";
import { useCallback, useEffect, useRef, useState } from "react";
import LinearBorder from "../Global/LinearBorder";
import { Input } from "../ui/input";

const DEBOUNCE_MS = 300;

type SearchFormProps = {
  /** Controlled mode: value and onChange only, no URL read/write */
  value?: string;
  onSearchChange?: (value: string) => void;
};

export default function SearchForm({ value: controlledValue, onSearchChange }: SearchFormProps = {}) {
  const t = useTranslations("Search");
  const isArabic = useIsArabic();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get("search") || "";
  const isControlled = controlledValue !== undefined && onSearchChange !== undefined;
  const [internalValue, setInternalValue] = useState(urlSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const value = isControlled ? controlledValue : internalValue;

  // Uncontrolled: sync from URL when it changes (e.g. back navigation)
  useEffect(() => {
    if (!isControlled) setInternalValue(urlSearch);
  }, [isControlled, urlSearch]);

  const applySearch = useCallback(
    (searchValue: string) => {
      if (isControlled) {
        onSearchChange?.(searchValue);
        return;
      }
      handleSetSearchParams(
        { search: searchValue, page: "1" },
        searchParams,
        router
      );
    },
    [isControlled, onSearchChange, searchParams, router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (isControlled) {
      onSearchChange?.(next);
      return;
    }
    setInternalValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applySearch(next);
      debounceRef.current = null;
    }, DEBOUNCE_MS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    applySearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full">
      <LinearBorder className="w-full">
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
            onChange={handleChange}
            placeholder={t("searchPlaceholder")}
            dir={isArabic ? "rtl" : "ltr"}
            className={cn(
              "h-11 w-full flex-1 min-w-0 pl-9 pr-11 rounded-full border-0 bg-transparent text-sm",
              isArabic ? "pr-9 pl-11 text-base font-semibold text-right" : ""
            )}
            aria-label={t("searchPlaceholder")}
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
