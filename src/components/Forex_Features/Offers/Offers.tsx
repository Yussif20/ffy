"use client";

import SearchInputField from "@/components/Forms/SearchInputField";
import { handleSetSearchParams } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { UserRole } from "@/types";
import AddNewOffer from "./AddNewOffer";
import OfferFilter from "./OfferFilter";
import OfferList from "./OfferList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const DEBOUNCE_MS = 300;

export default function Offers({
  initialSearchParams: _initialSearchParams,
}: {
  initialSearchParams?: Record<string, string>;
} = {}) {
  const currUser = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Search");
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  const applySearch = useCallback(
    (value: string) => {
      handleSetSearchParams({ search: value, page: "1" }, searchParams, router);
    },
    [searchParams, router]
  );

  const handleChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        applySearch(value);
        debounceRef.current = null;
      }, DEBOUNCE_MS);
    },
    [applySearch]
  );

  const handleSubmit = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    applySearch(searchInput);
  }, [applySearch, searchInput]);

  const isCurrentMonth = searchParams.get("isCurrentMonth") || "";
  const isExclusive = pathname.includes("exclusive-offers");
  const filterKey = `${isExclusive}-${isCurrentMonth}`;

  return (
    <div className="space-y-8 pb-10 md:pb-14">
      <div className="w-full flex justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
        <OfferFilter />
        <SearchInputField
          value={searchInput}
          onChange={handleChange}
          onSubmit={handleSubmit}
          placeholder={t("searchPlaceholder")}
        />
        {currUser && currUser.role !== UserRole.USER && <AddNewOffer />}
      </div>
      <OfferList key={filterKey} />
    </div>
  );
}
