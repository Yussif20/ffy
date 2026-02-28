"use client";

import { AddFirmDialog } from "@/components/FirmDetails/AddFirmDialog";
import LinearBorder from "@/components/Global/LinearBorder";
import { useQueryBuilder } from "@/hooks/usePagination";
import useIsArabic from "@/hooks/useIsArabic";
import { handleSetSearchParams } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useGetAllFirmsQuery } from "@/redux/api/firms.api";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import FirmAllFilters from "./FirmAllFilters";
import FirmsFilter from "./FirmsFilter";
import FirmTable from "./FirmTable";

export default function Firms({
  initialSearchParams: _initialSearchParams,
}: {
  initialSearchParams?: Record<string, string>;
} = {}) {
  const { getParamsWithKey } = useQueryBuilder();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();
  const isFuturesPage = pathname.includes("futures");
  const isArabic = useIsArabic();
  const t = useTranslations("Search");
  const router = useRouter();
  const page = getParamsWithKey("page", 1);

  const limit = getParamsWithKey("limit", 10);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm] = useDebounce(searchInput, 300);
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      handleSetSearchParams({ page: "1" }, searchParams, router);
    },
    [searchParams, router]
  );
  const assets = searchParams.get("assets") || "";
  const countries = searchParams.get("countries") || "";
  const range_maxAllocation = searchParams.get("range_maxAllocation") || "";
  const paymentMethodsArray_id = searchParams.get("paymentMethods") || "";
  const payoutMethodsArray_id = searchParams.get("payoutMethods") || "";
  const array_typeOfInstruments =
    searchParams.get("array_typeOfInstruments") || "";
  const range_yearsInOperation =
    searchParams.get("range_yearsInOperation") || "";
  const brokersArray_id = searchParams.get("brokers") || "";
  const platformsArray_id = searchParams.get("platforms") || "";
  const sort = searchParams.get("sort") || "";
  const category = getParamsWithKey("category");
  const drawdown = searchParams.get("drawdown") || "";
  const otherFeatures = searchParams.get("otherFeatures") || "";
  const programType = searchParams.get("programType") || "";
  const query = [
    page,
    limit,
    { name: "searchTerm", value: searchTerm },
    { name: "leverages.array_assets", value: assets },
    { name: "array_countries", value: countries },
    { name: "range_maxAllocation", value: range_maxAllocation },
    { name: "paymentMethods.array_id", value: paymentMethodsArray_id },
    { name: "payoutMethods.array_id", value: payoutMethodsArray_id },
    { name: "array_typeOfInstruments", value: array_typeOfInstruments },
    { name: "range_yearsInOperation", value: range_yearsInOperation },
    { name: "brokers.array_id", value: brokersArray_id },
    { name: "platforms.array_id", value: platformsArray_id },
    category,
    {
      name: "firmType",
      value: isFuturesPage ? "FUTURES" : "FOREX",
    },
  ];
  if (drawdown) {
    query.push({ name: "array_drawDowns", value: drawdown });
  }
  if (otherFeatures) {
    query.push({ name: "array_otherFeatures", value: otherFeatures });
  }
  if (programType) {
    query.push({ name: "oneItemArray_programTypes", value: programType });
  }
  if (sort) {
    let value = sort[0] === "-" ? sort.slice(1) : sort;
    const valuePrefix = sort[0] === "-" ? "-" : "";
    if (value === "assets") value = "leverages._count";
    if (value === "platforms") value = "platforms._count";
    if (value === "discount") value = "offerPercentage";
    query.push({ name: "sort", value: valuePrefix + value });
  }

  const { data: dataRaw, isLoading, isFetching } = useGetAllFirmsQuery(query);

  const firms = dataRaw?.firms || [];
  const firmsMeta = dataRaw?.meta || {};

  return (
    <div className="space-y-8 pb-10 md:pb-14">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-center overflow-x-hidden">
        <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-4 items-center order-2 lg:order-1">
          <FirmsFilter />
          {user?.role === "SUPER_ADMIN" && <AddFirmDialog />}
        </div>
        <div className={cn("w-full min-w-0 flex order-1 lg:order-2 lg:min-w-0 lg:w-3/4", isArabic ? "ml-0 mr-auto" : "mr-0 ml-auto")}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchChange(searchInput);
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
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
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
        </div>
      </div>

      <div className="flex items-start gap-0 lg:gap-6 w-full">
        <div className="w-0 min-w-0 max-w-0 overflow-hidden lg:w-auto lg:max-w-sm lg:overflow-visible flex shrink-0">
          <FirmAllFilters />
        </div>

        <div className="flex-1 min-w-0 -ms-5 -me-5 px-2 md:ms-0 md:me-0 md:px-0">
          <FirmTable
            firms={firms}
            // @ts-ignore
            meta={firmsMeta}
            isFuturesPage={isFuturesPage}
            isLoading={isLoading || isFetching}
          />
        </div>
      </div>
    </div>
  );
}
