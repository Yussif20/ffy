"use client";
import CustomForm from "./CustomForm";
import { cn, handleSetSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import CustomInput from "./CustomInput";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import useIsArabic from "@/hooks/useIsArabic";

export default function SearchForm() {
  const t = useTranslations("Search");
  const isArabic = useIsArabic();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const defaultValues = {
    search: search,
  };
  const handleSubmit = async (data: FieldValues) => {
    handleSetSearchParams(data, searchParams, router);
  };
  return (
    <div className="max-w-sm w-full">
      <CustomForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className=""
      >
        <CustomInput
          type="search"
          name="search"
          fieldClassName="h-11"
          placeholder={t("searchPlaceholder")}
          className={cn(isArabic ? "text-base font-semibold text-right" : "")}
          RightIconWidth={45}
          RightIcon={
            <Button type="submit" size={"sm"}>
              <Search />
            </Button>
          }
        ></CustomInput>
      </CustomForm>
    </div>
  );
}
