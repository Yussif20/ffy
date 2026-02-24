"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import FirmAllFilters from "../Firms/FirmAllFilters";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable from "./ChallengeTable";

export default function Challenges({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm] = useDebounce(searchInput, 300);
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
