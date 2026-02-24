"use client";

import SearchForm from "@/components/Forms/SearchForm";
import { Button } from "@/components/ui/button";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter, Plus } from "lucide-react";
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
};

export default function ChallengeFilter({
  hideAllFilter,
  searchValue,
  onSearchChange,
}: ChallengeFilterProps) {
  const t = useTranslations("Challenges");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterOpen = searchParams.get("filterOpen") === "true";
  const isArabic = useIsArabic();

  const [openModal, setOpenModal] = useState(false);
  const hasAppliedChallengeDefaults = useRef(false);
  const prevPathnameRef = useRef(pathname);

  const user = useAppSelector(useCurrentUser);
  const role = user?.role;

  // When switching Forex <-> Futures, reset so we re-apply defaults on the new tab
  if (pathname !== prevPathnameRef.current) {
    prevPathnameRef.current = pathname;
    hasAppliedChallengeDefaults.current = false;
  }

  // Set default size (100K) and steps (STEP1) together so URL ends up as ?in_steps=STEP1&size=100000
  useEffect(() => {
    if (hasAppliedChallengeDefaults.current) return;
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
  }, [pathname, searchParams, router]);

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };

  const searchFormProps =
    searchValue !== undefined && onSearchChange
      ? { value: searchValue, onSearchChange }
      : undefined;

  return (
    <div className="w-full flex flex-wrap justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-4 items-center">
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
      </div>
      <SearchForm {...searchFormProps} />

      {role === "SUPER_ADMIN" && (
        <div>
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus />
          </Button>
        </div>
      )}

      <CreateChallengeModal
        open={openModal}
        setOpen={setOpenModal}
        firmOptions={[]}
        firmsLoading={false}
      />
    </div>
  );
}
