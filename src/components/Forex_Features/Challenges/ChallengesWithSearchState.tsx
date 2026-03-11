"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleSetSearchParams } from "@/lib/utils";
import { useColumnCustomization } from "@/hooks/useColumnCustomization";
import CustomizeColumnsDialog from "@/components/Global/CustomizeColumnsDialog";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable, { CHALLENGE_COLUMNS } from "./ChallengeTable";
import SelectOptions from "./SelectOptions";
import { useGetFirmsQuery } from "@/redux/api/spreadApi";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";

type Props = {
  locale: string;
  companySlug?: string;
};

export default function ChallengesWithSearchState({
  locale,
  companySlug,
}: Props) {
  const user = useAppSelector(useCurrentUser);
  const isAdmin = user?.role === "SUPER_ADMIN";
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
  const { data: firmsData } = useGetFirmsQuery(
    { limit: 500 },
    { skip: !companySlug }
  );
  const firm = companySlug
    ? (firmsData?.data || []).find((f: any) => f.slug === companySlug)
    : null;
  const challengeNames: string[] = firm?.challengeNames || [];

  const {
    visibility,
    order,
    toggleVisibility,
    reorder,
    resetToDefaults,
    setAllVisibility,
    orderedVisibleKeys,
    columns,
  } = useColumnCustomization("challenge-table-columns", CHALLENGE_COLUMNS);

  return (
    <div className="space-y-8 pb-20 md:pb-30">
      <ChallengeFilter
        hideAllFilter
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        beforeFilter={
          <>
            {isAdmin && companySlug && challengeNames.length > 0 && (
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
