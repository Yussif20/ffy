"use client";

import SearchForm from "@/components/Forms/SearchForm";
import { Button } from "@/components/ui/button";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { Filter, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectOptions from "./SelectOptions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CreateChallengeModal from "./CreateChallengeModal";
import { useCurrentUser } from "@/redux/authSlice";
import { useAppSelector } from "@/redux/store";
import useIsArabic from "@/hooks/useIsArabic";

export default function ChallengeFilter({
  hideAllFilter,
}: {
  hideAllFilter?: boolean;
}) {
  const t = useTranslations("Challenges");
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterOpen = searchParams.get("filterOpen") === "true";
  const isArabic = useIsArabic();

  const [openModal, setOpenModal] = useState(false);

  const user = useAppSelector(useCurrentUser);
  const role = user?.role;

  const handleSetCategory = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };

  return (
    <div className="w-full flex flex-wrap justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
      <div className="flex flex-wrap gap-2 md:gap-4 items-center">
        {!hideAllFilter && (
          <Button
            className={cn(
              "px-3! sm:px-6! text-xs sm:text-sm",
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
          defaultValue="100000"
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
          defaultValue="STEP1"
          cols={2}
        />
      </div>
      <SearchForm />

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
