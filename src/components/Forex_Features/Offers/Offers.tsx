"use client";
import { useAppSelector } from "@/redux/store";
import { UserRole } from "@/types";
import AddNewOffer from "./AddNewOffer";
import OfferFilter from "./OfferFilter";
import OfferList from "./OfferList";

export default function Offers() {
  const currUser = useAppSelector((state) => state.auth.user);
  return (
    <div>
      {currUser && currUser.role !== UserRole.USER && (
        <div className="flex items-center justify-end  mb-2 md:mb-5">
          <AddNewOffer />
        </div>
      )}
      <div className="space-y-8 pb-20 md:pb-30">
        <OfferFilter />
        <OfferList />
      </div>
    </div>
  );
}
