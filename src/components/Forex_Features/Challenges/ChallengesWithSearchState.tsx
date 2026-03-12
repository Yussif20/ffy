"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleSetSearchParams } from "@/lib/utils";
import { useColumnCustomization } from "@/hooks/useColumnCustomization";
import CustomizeColumnsDialog from "@/components/Global/CustomizeColumnsDialog";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable, { CHALLENGE_COLUMNS, FUTURES_CHALLENGE_COLUMNS } from "./ChallengeTable";
import SelectOptions from "./SelectOptions";
import { useGetAllFirmsQuery } from "@/redux/api/firms.api";
import useIsFutures from "@/hooks/useIsFutures";

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
  const tChallenges = useTranslations("Challenges");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm] = useDebounce(searchInput, 300);
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      handleSetSearchParams({ page: "1" }, searchParams, router);
    },
    [searchParams, router]
  );

  // Fetch firm data to get challengeNames for the filter (only when on a firm's challenges page)
  const { data: firmsData } = useGetAllFirmsQuery(
    [{ name: "slug", value: companySlug! }],
    { skip: !companySlug }
  );
  const firm = companySlug ? firmsData?.firms?.[0] ?? null : null;
  const challengeNames: string[] = firm?.challengeNames || [];

  const isFutures = useIsFutures();
  const columnDefs = isFutures ? FUTURES_CHALLENGE_COLUMNS : CHALLENGE_COLUMNS;
  const storageKey = isFutures ? "challenge-table-columns-futures" : "challenge-table-columns";

  const {
    visibility,
    order,
    toggleVisibility,
    reorder,
    resetToDefaults,
    setAllVisibility,
    orderedVisibleKeys,
    columns,
  } = useColumnCustomization(storageKey, columnDefs);

  return (
    <div className="space-y-8 pb-20 md:pb-30">
      <ChallengeFilter
        hideAllFilter
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        beforeFilter={
          <>
            {companySlug && challengeNames.length > 0 && (
              <SelectOptions
                name="in_challengeName"
                title="Challenge Name"
                options={challengeNames.map((name) => ({
                  name,
                  value: name,
                }))}
                cols={2}
              />
            )}
            <CustomizeColumnsDialog
              columns={columns}
              visibility={visibility}
              order={order}
              orderedVisibleKeys={orderedVisibleKeys}
              toggleVisibility={toggleVisibility}
              setAllVisibility={setAllVisibility}
              reorder={reorder}
              resetToDefaults={resetToDefaults}
              t={tChallenges}
            />
          </>
        }
      />
      <div className="flex">
        <ChallengeTable
          companySlug={companySlug}
          locale={locale}
          searchTermFromState={searchTerm}
          orderedVisibleKeys={orderedVisibleKeys}
        />
      </div>
    </div>
  );
}
