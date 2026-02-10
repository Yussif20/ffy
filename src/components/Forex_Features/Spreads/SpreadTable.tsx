"use client";

import { Table, TableBody } from "@/components/ui/table";
import { countriesAndCurrency } from "@/data";
import { Pagination } from "@/components/Global/Pagination";
import SortTableHeader from "@/components/Global/SortTableHeader";
import SpreadRow from "./SpreadRow";
import AddSpreadModal from "./AddSpreadModal";
import AddSymbolModal from "./AddSymbolModal";
import { useTranslations } from "next-intl";
import {
  useGetAllSpreadQuery,
  useGetAllSymbolQuery,
} from "@/redux/api/spreadApi";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { Spread, TMeta, TQueryParam } from "@/types";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/Global/TableSkeleton";
import SingleSymbolCell from "./SingleSymbolCell";
import useGetParams from "@/hooks/useGetParams";
import SpreadAllFilters from "./SpreadAllFilter";

export default function SpreadTable() {
  const t = useTranslations("Spread");
  const currentUser = useAppSelector(useCurrentUser);
  const userRole = currentUser?.role;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const category = searchParams.get("category") || "";
  const selectedSymbols = searchParams.get("symbols") || "";
  const search = searchParams.get("search") || "";
  const {
    platforms,
    firms: selectedFirms,

  } = useGetParams();
  const queries: TQueryParam[] = [
    { name: "page", value: page },
    { name: "limit", value: 100 },
    { name: "type", value: category },
  ];




  const { data, isLoading } = useGetAllSpreadQuery(queries);
  const { data: symbolData, isLoading: isSymbolLoading } =
    useGetAllSymbolQuery();

  const meta: TMeta = data?.meta;

  const symbols = symbolData?.data || [];
  const currencies = countriesAndCurrency(symbols);

  const currencyWithLabel = (selectedSymbols ? currencies.filter((item) => selectedSymbols.split(',').includes(item.id)) : currencies).map((item) => {
    const components = (
      <SingleSymbolCell item={item} key={item.id} symbol={item.symbol} />
    );
    return {
      field: item.symbol.id,
      label: components,
      id: item.id,
    };
  });

  if (isSymbolLoading || isLoading) {
    return (
      <TableSkeleton
        headers={[
          t("firm"),
          t("platform"),
          ...(currencyWithLabel || []).map((item) => item.field),
        ]}
      />
    );
  }
  const spreadData: Spread[] = data?.data || [];

  const currencyIds = currencyWithLabel.map((item) => item.id);

  const sort = searchParams.get("sort") || "";
  const sortSymbolId = sort[0] === "-" ? sort.slice(1) : sort;
  const sortBy = sort[0] === "-" ? "desc" : "asc";
  const sortedData = sort
    ? [...spreadData].sort((a, b) => {
      const aData = a.spreadSymbolValues.find(
        (item) => item.symbolId === sortSymbolId,
      );
      const bData = b.spreadSymbolValues.find(
        (item) => item.symbolId === sortSymbolId,
      );
      const aValueDifferent = (aData?.maxValue || 0) - (aData?.minValue || 0);
      const bValueDifferent = (bData?.maxValue || 0) - (bData?.minValue || 0);
      if (aValueDifferent < bValueDifferent) {
        return sortBy === "asc" ? -1 : 1;
      }
      if (aValueDifferent > bValueDifferent) {
        return sortBy === "asc" ? 1 : -1;
      }
      return 0;
    })
    : spreadData;

  const seen = new Set();

  const firms = (spreadData || [])
    .filter(item => {
      const id = item?.firm?.id;
      return id && !seen.has(id) && seen.add(id);
    })
    .map(item => ({
      id: item.firm.id,
      name: item.firm.title,
      image: item.firm.logoUrl
    }));
  const selectedFirmsIds = selectedFirms.split(",");
  const selectedPlatformsIds = platforms.split(",");
  const filteredSortedFirms = selectedFirms ? sortedData.filter(item => selectedFirmsIds.includes(item.firm.id)) : sortedData;
  const filteredByPlatform = platforms ? filteredSortedFirms.filter(item => selectedPlatformsIds.includes(item.platform.id)) : filteredSortedFirms;
  const filterBySearch = search ? filteredByPlatform.filter(item => item.firm.title.toLowerCase().includes(search.toLowerCase())) : filteredByPlatform;

  return (

    <div className="flex">
      <div className="max-w-sm flex">
        <SpreadAllFilters firms={firms} currencies={currencies} />
      </div>
      <div className="max-w-full w-full space-y-8 overflow-hidden">
        <div className="flex items-start gap-2">
          <Table>
            <SortTableHeader
              headers={[
                { label: t("firm"), field: "firm", hideSort: true },
                {
                  label: t("platform"),
                  field: "platform",
                  hideSort: true,
                  center: true,
                },
                ...currencyWithLabel,
                ...(userRole === "SUPER_ADMIN"
                  ? [{ label: "action", field: "action", hideSort: true }]
                  : []),
              ]}
            />
            {isLoading || isSymbolLoading ? (
              <TableSkeleton
                headers={[
                  t("firm"),
                  t("platform"),
                  ...currencyWithLabel.map((item) => item.field),
                  ...(userRole === "SUPER_ADMIN" ? ["action"] : []),
                ]}
              />
            ) : (
              <TableBody colSpan={7}>
                {(filterBySearch || []).map((item: any) => (
                  <SpreadRow
                    currencyIds={currencyIds}
                    key={item.id}
                    spreadItem={item}
                    userRole={userRole}
                  />
                ))}
              </TableBody>
            )}
          </Table>
          {userRole === "SUPER_ADMIN" && <AddSymbolModal />}
        </div>
        {userRole === "SUPER_ADMIN" && <AddSpreadModal />}
        <Pagination totalPages={meta?.totalPage} />
      </div>
    </div>

  );
}
