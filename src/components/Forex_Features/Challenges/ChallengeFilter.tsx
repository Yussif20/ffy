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
    <div className="w-full flex justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
      <div className="flex gap-2 md:gap-4 items-center overflow-x-auto">
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
            { name: "$30K", value: "30000" },
            { name: "$75K", value: "75000" },
            { name: "$120K", value: "120000" },
            { name: "$200K", value: "200000" },
            { name: "$350K", value: "350000" },
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
