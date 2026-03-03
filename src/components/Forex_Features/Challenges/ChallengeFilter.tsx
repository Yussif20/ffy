"use client";

import LinearBorder from "@/components/Global/LinearBorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter, Plus, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectOptions from "./SelectOptions";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import CreateChallengeModal from "./CreateChallengeModal";
import { useCurrentUser } from "@/redux/authSlice";
import { useAppSelector } from "@/redux/store";
import useIsArabic from "@/hooks/useIsArabic";

type ChallengeFilterProps = {
  hideAllFilter?: boolean;
  /** When provided, search is controlled (no URL); parent holds state */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** Server-resolved search params — used to skip the defaults useEffect when defaults are already in the URL */
  initialSearchParams?: Record<string, string>;
};

export default function ChallengeFilter({
  hideAllFilter,
  searchValue,
  onSearchChange,
  initialSearchParams,
}: ChallengeFilterProps) {
  const t = useTranslations("Challenges");
  const tSearch = useTranslations("Search");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterOpen = searchParams.get("filterOpen") === "true";
  const isArabic = useIsArabic();

  const [openModal, setOpenModal] = useState(false);
  // Pre-mark defaults as applied when the server already passed them in initialSearchParams
  const serverHasDefaults = Boolean(
    initialSearchParams?.size || initialSearchParams?.size_range || initialSearchParams?.in_steps
  );
  const hasAppliedChallengeDefaults = useRef(serverHasDefaults);
  const prevPathnameRef = useRef(pathname);

  const user = useAppSelector(useCurrentUser);
  const role = user?.role;

  // Firm challenges page: never apply default filters (no 100k / STEP1)
  const isFirmChallengesPage = pathname.includes("/firms/") && pathname.includes("/challenges");

  // When switching Forex <-> Futures, reset so we re-apply defaults on the new tab
  if (pathname !== prevPathnameRef.current) {
    prevPathnameRef.current = pathname;
    hasAppliedChallengeDefaults.current = false;
  }

  // Set default size (100K) and steps (STEP1) together so URL ends up as ?in_steps=STEP1&size=100000
  // Skip defaults on firm info challenges tab so all challenges show without pre-selected filters
  useEffect(() => {
    if (isFirmChallengesPage || hasAppliedChallengeDefaults.current) return;
    const hasSize = searchParams.get("size") || searchParams.get("size_range");
    const hasSteps = searchParams.get("in_steps");
    if (hasSize && hasSteps) {
      hasAppliedChallengeDefaults.current = true;
      return;
    }
    const next: Record<string, string> = {};
    if (!hasSize) next.size = "100000";
    if (!hasSteps) next.in_steps = "STEP1";
    if (Object.keys(next).length > 0) {
      hasAppliedChallengeDefaults.current = true;
      handleSetSearchParams(next, searchParams, router);
    }
  }, [pathname, searchParams, router, isFirmChallengesPage]);

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-center overflow-x-hidden">
      <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-4 items-center order-2 lg:order-1">
        {!hideAllFilter && (
          <Button
            className={cn(
              "h-8 px-2! text-[11px] sm:h-9 sm:px-3! sm:text-xs md:px-6! md:text-sm",
              isArabic && "font-semibold"
            )}
            onClick={() => {
              handleSetCategory({ filterOpen: filterOpen ? "" : "true" });
            }}
            variant={filterOpen ? "defaultBH" : "secondary"}
          >
            <Filter /> {t("filter")}
          </Button>
        )}
        <SelectOptions
          name="size"
          title={t("size")}
          options={[
            { name: "$5K", value: "5000" },
            { name: "$10K", value: "10000" },
            { name: "$25K", value: "25000" },
            { name: "$50K", value: "50000" },
            { name: "$100K", value: "100000" },
            { name: "$200K", value: "200000" },
            { name: "$300K", value: "300000" },
            { name: "$500K", value: "500000" },
          ]}
          custom={{
            show: true,
            max: 2000000,
            min: 600,
          }}
        />

        <SelectOptions
          name="in_steps"
          title={t("steps")}
          options={[
            { name: t("INSTANT"), value: "INSTANT" },
            { name: t("STEP1"), value: "STEP1" },
            { name: t("STEP2"), value: "STEP2" },
            { name: t("STEP3"), value: "STEP3" },
            { name: t("STEP4"), value: "STEP4" },
          ]}
          cols={2}
        />
        {role === "SUPER_ADMIN" && (
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus />
          </Button>
        )}
      </div>
      <div className={cn("w-full min-w-0 flex order-1 lg:order-2 lg:min-w-0 lg:w-3/4", isArabic ? "ml-0 mr-auto" : "mr-0 ml-auto")}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchChange?.(searchValue ?? "");
          }}
          className="w-full max-w-none min-w-0 flex-1"
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
                value={searchValue ?? ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={tSearch("searchPlaceholder")}
                dir={isArabic ? "rtl" : "ltr"}
                className={cn(
                  "h-11 w-full flex-1 min-w-0 pl-9 pr-11 rounded-full border-0 bg-transparent text-sm",
                  isArabic ? "pr-9 pl-11 text-base font-semibold text-right" : ""
                )}
                aria-label={tSearch("searchPlaceholder")}
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
      </div>

      <CreateChallengeModal
        open={openModal}
        setOpen={setOpenModal}
        firmOptions={[]}
        firmsLoading={false}
      />
    </div>
  );
}
