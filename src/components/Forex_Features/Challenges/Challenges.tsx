"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import FirmAllFilters from "../Firms/FirmAllFilters";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable from "./ChallengeTable";

export default function Challenges({
  locale,
  initialSearchParams,
}: {
  locale: string;
  initialSearchParams?: Record<string, string>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const marketType = pathname.includes("futures") ? "futures" : "forex";
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm] = useDebounce(searchInput, 300);
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  useEffect(() => {
    const storageKey = "ffy_marketType_challenges";
    const prev = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;
    if (prev !== null && prev !== marketType) {
      handleSetSearchParams({ page: "1" }, searchParamsRef.current, router);
    }
    if (typeof window !== "undefined") sessionStorage.setItem(storageKey, marketType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketType, router]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      handleSetSearchParams({ page: "1" }, searchParams, router);
    },
    [searchParams, router]
  );

  return (
    <div className="space-y-8 pb-10 md:pb-14">
      <ChallengeFilter
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        initialSearchParams={initialSearchParams}
      />
      <div className="flex items-start gap-0 lg:gap-6 w-full">
        <div className="w-0 min-w-0 max-w-0 overflow-hidden lg:w-auto lg:max-w-sm lg:overflow-visible flex shrink-0">
          <FirmAllFilters showCompanyFilter />
        </div>
        <div className="flex-1 min-w-0 -ms-5 -me-5 px-2 md:ms-0 md:me-0 md:px-0">
          <ChallengeTable
            locale={locale}
            searchTermFromState={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}
