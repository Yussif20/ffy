"use client";
import SearchForm from "@/components/Forms/SearchForm";
import { useAppSelector } from "@/redux/store";
import { UserRole } from "@/types";
import AddNewOffer from "./AddNewOffer";
import OfferFilter from "./OfferFilter";
import OfferList from "./OfferList";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Offers({
  initialSearchParams: _initialSearchParams,
}: {
  initialSearchParams?: Record<string, string>;
} = {}) {
  const currUser = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCurrentMonth = searchParams.get("isCurrentMonth") || "";
  const isExclusive = pathname.includes("exclusive-offers");
  const filterKey = `${isExclusive}-${isCurrentMonth}`;

  return (
    <div className="space-y-8 pb-10 md:pb-14">
      <div className="w-full flex justify-between md:items-center flex-col lg:flex-row gap-5 overflow-x-hidden">
        <OfferFilter />
        <SearchForm />
        {currUser && currUser.role !== UserRole.USER && <AddNewOffer />}
      </div>
      <OfferList key={filterKey} />
    </div>
  );
}
