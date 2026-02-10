"use client";
import { Pagination } from "@/components/Global/Pagination";
import BS_Row from "./BS_Row";
import { useGetAllBestSellersQuery } from "@/redux/api/bestSellerApi";
import { OfferCardSkeleton } from "../Offers/Skeleton";
import { useSearchParams } from "next/navigation";
import { TQueryParam } from "@/types";
import useIsFutures from "@/hooks/useIsFutures";

export default function BS_Table() {
  const isFutures = useIsFutures();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "";
  const type = searchParams.get("type") || "";
  const page = searchParams.get("page") || "";
  const queryParams: TQueryParam[] = [];
  if (sort) queryParams.push({ name: "sort", value: sort });
  if (type) queryParams.push({ name: "type", value: type });
  if (page) queryParams.push({ name: "page", value: page });
  queryParams.push({
    name: "firm.firmType",
    value: isFutures ? "FUTURES" : "FOREX",
  });
  const { data, isLoading, isFetching } =
    useGetAllBestSellersQuery(queryParams);

  if (isLoading || isFetching)
    return (
      <div className="space-y-8">
        <OfferCardSkeleton />
        <OfferCardSkeleton />
        <OfferCardSkeleton />
      </div>
    );
  const bestSellers = data?.data || [];

  return (
    <div className="space-y-8">
      {bestSellers?.map((item, idx) => (
        <BS_Row
          company={item}
          prevCompany={bestSellers[idx - 1] || null}
          nextCompany={bestSellers[idx + 1] || null}
          key={idx}
        />
      ))}
      <Pagination totalPages={data?.meta?.totalPage || 0} />
    </div>
  );
}
