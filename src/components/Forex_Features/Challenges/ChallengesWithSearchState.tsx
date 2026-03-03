"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable from "./ChallengeTable";

type Props = {
  locale: string;
  companySlug?: string;
};

export default function ChallengesWithSearchState({
  locale,
  companySlug,
}: Props) {
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
    <div className="space-y-8 pb-20 md:pb-30">
      <ChallengeFilter
        hideAllFilter
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
      />
      <div className="flex">
        <ChallengeTable
          companySlug={companySlug}
          locale={locale}
          searchTermFromState={searchTerm}
        />
      </div>
    </div>
  );
}
