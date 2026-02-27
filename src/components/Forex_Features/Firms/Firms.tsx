"use client";

import { AddFirmDialog } from "@/components/FirmDetails/AddFirmDialog";
import { useQueryBuilder } from "@/hooks/usePagination";
import { useGetAllFirmsQuery } from "@/redux/api/firms.api";
import { useAppSelector } from "@/redux/store";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { handleSetSearchParams } from "@/lib/utils";
import SearchForm from "@/components/Forms/SearchForm";
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
  const brokersArray_id = searchParams.get("brokers.array_id") || "";
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
      <div className="w-full flex justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
        <FirmsFilter />
        <SearchForm value={searchInput} onSearchChange={handleSearchChange} />
        {user?.role === "SUPER_ADMIN" && <AddFirmDialog />}
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
